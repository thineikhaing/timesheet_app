import React, { useContext ,useState, useEffect} from "react";
import { useParams } from 'react-router';
import { MainContext } from "../UserProvider";
import Typography from '@mui/material/Typography';
import api from "../Api";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import ResponsiveDrawer from "./AdminMenu";
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import DataTable from 'react-data-table-component';
import moment from 'moment-timezone';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const UserAttendence = () => {
    const [currentUser] = useContext(MainContext);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [staffData, setstaffData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [openalert1, setAlertOpen1] = React.useState(false);

    const handleSelectDay = async (id) => {

        await api.get(`/edit_clockevent/${id}`).then(({data}) => {
          setSelected(data)
        }).catch(res => {
          console.log('error', res)
        })
    }

    const handleInTimeChange = date => {
        setSelected({ ...selected, clock_in: date});
    };
    
    const handleOutTimeChange = date => {
        setSelected({ ...selected, clock_out: date});
    };

    const handleEditTime = async () => {
        console.log(selected)
        var editEntry = true
        if (selected.clocking_in == false){
            var check_if_after = moment(selected.clock_out).isAfter(selected.clock_in);
            if(!check_if_after){
                editEntry = false
                setAlertOpen1(true);
            }
        }
        
        if(editEntry){
            await api.post('/update_clockevent', { id: selected.id, clock_in: selected.clock_in, clock_out: selected.clock_out }).then(res => {
                setSelected(null)
                console.log(res)

                var overlapTime = res.data.overlapTime
                if (overlapTime == true){
                    setAlertOpen2(true);
                }
                else{
                    location.reload(); 
                }

            }).catch(res => {
            console.log(res)
            })
        }
    }

    const handleEditCancel =() =>{
        setSelected(null)
    }

    const columns = [
        {
            name: 'Date',
            selector:  row => `${ moment(row.entry_date).format(' MMMM Do YYYY') }`,
            sortable: true,
            center: true,
            cell: row => <a className="date-click" onClick={() => handleSelectDay(row.id)}>{moment(row.entry_date).format('MMMM Do YYYY')}</a>
        },
        {   name: 'Clock In', 
            selector: row => `${ moment(row.clock_in).local().format(' hh:mm A')}`, 
            sortable: true, center: true 
        },
        {   
            name: 'Clock Out', 
            selector: row => `${ moment(row.clock_out).local().format(' hh:mm A')}`, 
            conditionalCellStyles: [
                {
                    when: row => row.clock_out == null   ,
                    style: {
                        visibility: 'hidden'} 
                }
                
            ],

            sortable: true, center: true },
    
        {   name: 'Hours', 
            selector:  row => `${ row.total_hours }`, 
            sortable: true, center: true },
        {
            name: "Actions",
            cell: row => <div style={{ display: 'flex' }}><Button onClick={() => handleSelectDay(row.id)}>Edit</Button> <Button color="error" onClick={() => handleDestroyTime(row.id)} ><DeleteIcon /></Button></div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];


    const handleDestroyTime = async (id) =>{
        await api.post('/delete_clockevent', { id: id }).then(({data}) => {
            setSelected(null)
          }).catch(res => {
            console.log('error', res)
          })
          location.reload();
    }

    useEffect(() => {    
        api.get(`/get_user_clockevents/${id}`).then(({data}) => {
            setData(data.clock_events);
            setstaffData(data.user)
        }).catch(res => {
          console.log(res)
        });
    }, []);

    return ( 
        <Box sx={{ display: 'flex' }}>
            <ResponsiveDrawer/>
            <Box component="main"sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Paper>
                <Card>
                    <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {staffData.username}
                            </Typography>
                            <Typography compoent='p'>{staffData.email}</Typography>
                            { staffData.last_sign_in_at != null &&
                                <Typography compoent='p'>Last login time was: {moment(staffData.last_sign_in_at).format(' MMMM Do YYYY  hh:mm A')}</Typography>
                            }
                            {/* <Typography variant="body2" color="text.secondary">
                                Check out the current clock in/out events, or create a new one.
                            </Typography> */}
                        </CardContent>

                    </Card>
            </Paper>
            <br/>
            { selected &&

                <Paper >
                    <div className="selected-day">
                    
                    <Typography className="selected_date" variant="h5">
                    { 
                        moment(selected.entry_date).format('MMMM Do YYYY')
                    }
                    </Typography>
                    <br/>
                    <Collapse in={openalert1}>
                        <Alert severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertOpen1(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >  
                        <AlertTitle>Please enter avalid Time. </AlertTitle>
                        Clock out time should <strong> after clock in time.</strong>
                        </Alert>
                    </Collapse>
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

                        <Button variant="contained" className="submit_btn" onClick={handleEditTime}>Update</Button>
                        &nbsp;
                        <Button variant="text" onClick={handleEditCancel} >Cancel</Button>
                    </Container>  
                    </div>  
                </Paper>
                }

            <Paper className="timecard">
                {data && (
                    <>
                    <br/>
                    <Typography gutterBottom variant="h5" component="div">
                        TimeCard
                    </Typography>
                
                    <DataTable 
                            columns={columns} 
                            data={data} 
                            pagination 
                            highlightOnHover 
                            customStyles={tableStyles}
                    />
                    </>
                )}
            </Paper>
            </Box>
    </Box>
        
  );
}

export default UserAttendence;

const tableStyles = {
    rows: {
      style: {
        minHeight: '52px', // override the row height
      }
    },
    headCells: {
      style: {
        fontSize: '1rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        // paddingLeft: '0 8px'
      },
    },
    cells: {
      style: {
        fontSize: '1rem',
        // paddingLeft: '0 8px',
      },
    },
};


