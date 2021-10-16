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
import ClockTable from "./ClockEvent";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DataTable from 'react-data-table-component';
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
    const [loaded, setLoaded] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDateChange = date => setSelectedDate(date); 

    const handleAddEntry = async () => {
        console.log(selectedDate)
        await api.post('/create_clock_event', { dateTime: selectedDate }).then(res => {
            console.log(res)
            handleClose();
        //   Swal.fire({
        //     icon: 'success',
        //     title: 'Time entry added successfully',
        //     showConfirmButton: false,
        //     timer: 1500
        //   })
        }).catch(res => {
          console.log('Something wrong');
        })
        location.reload();
    }

    useEffect(() => {
        api.get('/get_timesheet').then(({data}) => {
            console.log(data)
            setData(data);
            setLoaded(true);
        }).catch(res => {
          console.log(res)
        });
      }, []);

      const columns = [
        {
          name: 'Date',
          selector:  row => `${ row.entry_date }`,
          sortable: true,
          center: true,
          cell: row => <a className="date-click" onClick={() => handleSelectDay(row.id)}>{row.entry_date}</a>
        },
        { name: 'Clock In', selector: row => `${ row.clock_in }`, sortable: true, center: true },
        { name: 'Clock Out', selector: row => `${ row.clock_out }`, sortable: true, center: true },
        { name: 'Clocking In', selector:  row => `${ row.clocking_in }`, sortable: true, center: true },
      ];

    return ( 
        <React.Fragment>
        <CssBaseline />
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Select the date and time to Clock In.
            </Typography>
            <br/>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                    label="Date desktop"
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
                    <Button variant="contained" color="success" onClick={handleOpen}>
                        Clock In
                    </Button>
                </CardActions>
            </Card>
            <br/>
            <Divider light />
            {/* <ClockTable/> */}

            {data && (
                <>
           
                <DataTable columns={columns} data={data} pagination highlightOnHover />
                </>
            )}

        </Container>
        </React.Fragment>
        
  );

}

export default Home;
