import React, { useContext ,useState, useEffect} from "react";
import { MainContext } from "./UserProvider";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DataTable from 'react-data-table-component';
import Paper from '@mui/material/Paper';
import "react-data-table-component-extensions/dist/index.css";

import api from "./Api";

const modalStyle = {
  position: 'absolute',
  top: '21%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  
};

const Home = () => {
    const [currentUser] = useContext(MainContext)  

    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    const [data, setData] = useState([]);
    const [clockingin, setClockingin]  = React.useState(false);

    const [selected, setSelected] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDateChange = date => setSelectedDate(date);

    const handleInTimeChange = date => {
        console.log("In time", date)
        setSelected({ ...selected, clock_in: date});
    };
    
    const handleOutTimeChange = date => {
        console.log("Out time", date)
        setSelected({ ...selected, clock_out: date});
    };
    const handleEditTime = async () => {
        console.log("handleEditTime")
        console.log(selected)
        await api.post('/update_clockevent', { id: selected.id, clock_in: selected.clock_in, clock_out: selected.clock_out }).then(res => {
            setSelected(null)
        }).catch(res => {
          console.log(res)
        })
        location.reload()
    }

    const handleEditCancel =() =>{
        setSelected(null)
    }
    
    const handleSelectDay = async (id) => {

        await api.get(`/edit_clockevent/${id}`).then(({data}) => {
          setSelected(data)
        //   setSelectedTime(null)
        }).catch(res => {
          console.log('error', error)
        })
    }
    const handleAddEntry = async () => {
        console.log(selectedDate)
        await api.post('/create_clock_event', { dateTime: selectedDate }).then(res => {
            console.log(res)
            handleClose();
        }).catch(res => {
          console.log('Something wrong');
        })
        location.reload();
    }

    useEffect(() => {
        api.get('/get_timesheet').then(({data}) => {
            console.log(data)
            setData(data.clock_event);
            setClockingin(data.isClockingin)
            
        }).catch(res => {
          console.log(res)
        });


      }, []);

      const columns = [
        {
          name: 'Date',
          selector:  row => `${ row.clock_in_date }`,
          sortable: true,
          center: true,
          cell: row => <a className="date-click" onClick={() => handleSelectDay(row.id)}>{row.clock_in_date}</a>
        },
        { name: 'Clock In', selector: row => `${ row.clock_in_time }`, sortable: true, center: true },
        { name: 'Clock Out', selector: row => `${ row.clock_out_time }`, sortable: true, center: true },
        { name: 'Hours', selector:  row => `${ row.total_hours }`, sortable: true, center: true },
        {
            name: "Action",
            cell: row => <Button onClick={() => handleSelectDay(row.id)}>Edit</Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          }
      ];


    return ( 
        <React.Fragment>
        <CssBaseline />

        <Container className="home_container">
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Welcome, {currentUser.username}
                    </Typography>
                    <Typography compoent='p'>{currentUser.email}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Check out the current clock in/out events, or create a new one.
                    </Typography>
                </CardContent>
                <CardActions>
                    { clockingin &&
                        <Button variant="contained" color="error" onClick={handleOpen}>
                            Clock Out
                        </Button>
                    }
                    { clockingin == false &&
                        <Button variant="contained" color="warning" onClick={handleOpen}>
                            Clock In
                        </Button>
                    }
                </CardActions>
            </Card>
            <br/>
          

            { selected &&

                <Paper className="selected-day">
                    
                    <Typography className="selected_date" variant="p">
                    { selected.clock_in_date }
                    </Typography>
                    <br/>
                    <Container maxWidth="sm">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack className="time_stack" direction="row" spacing={3}>
                                <TimePicker
                                label="Clock In Time"
                                value={selected.clock_in}
                                onChange={handleInTimeChange}
                                renderInput={(params) => <TextField {...params} />}
                                />
                                <br/>

                                { selected.clocking_in == false &&
                                    <TimePicker
                                    label="Clock Out Time"
                                    value={selected.clock_out}
                                    onChange={handleOutTimeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                }
                                
                            
                            </Stack>
                        </LocalizationProvider>
                        <br/>
                        <Button variant="text" onClick={handleEditTime}>Update</Button>
                        &nbsp;
                        <Button variant="text" onClick={handleEditCancel} >Cancel</Button>
                    </Container>    
                </Paper>
          }



            {data && (
                <>
                <br/>
                <Typography gutterBottom variant="h5" component="div">
                       TimeCard
                </Typography>


                <DataTable columns={columns} data={data} pagination highlightOnHover />
                </>
            )}

        </Container>


        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Select the date and time.
            </Typography>
            <br/>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                    label="Time"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                  
                </Stack>
            </LocalizationProvider>
            <br/>
            <Button variant="contained" onClick={handleAddEntry} color="success">Add</Button>

            </Box>
        </Modal>

        </React.Fragment>
        
  );

}

export default Home;
