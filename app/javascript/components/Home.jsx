import React, { useContext ,useState, useEffect,useMemo} from "react";
import { MainContext } from "./UserProvider";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "./Api";
import moment from 'moment-timezone';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';
import { Divider } from "@mui/material";

const Export = ({ onExport }) => <Button variant="contained" className="submit_btn" onClick={e => onExport(e.target.value)}>Export</Button>;

const Home = () => {
    const [currentUser] = useContext(MainContext)  

    const [open, setOpen] = React.useState(false);
    const [openalert, setAlertOpen] = React.useState(false);
    const [openalert1, setAlertOpen1] = React.useState(false);
    const [openalert2, setAlertOpen2] = React.useState(false);

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    const [data, setData] = useState([]);
    const [clockingin, setClockingin]  = React.useState(false);
    const [clockedinDate, setClockedinDate] = React.useState(new Date());

    const [selected, setSelected] = useState(null);

    const handleClose = () => setOpen(false);
    const handleDateChange = date => setSelectedDate(date);

    const [weeklyHr, setWeeklyHr] = useState('00:00');
    const [monthlyHr, setMonthlyHr] = useState('00:00');

    const downloadCSV = () =>{
        api.get('/get_timesheet').then(({data}) => {
            const clockData = data.clock_events;

            const link = document.createElement('a');
            let csv = convertArrayOfObjectsToCSV(clockData);
            if (csv == null) return;

            const filename = 'export.csv';

            if (!csv.match(/^data:text\/csv/i)) {
                csv = `data:text/csv;charset=utf-8,${csv}`;
            }

            link.setAttribute('href', encodeURI(csv));
            link.setAttribute('download', filename);
            link.click();
            
        }).catch(res => {
          console.log(res)
        });

    }
    
    const convertArrayOfObjectsToCSV = (array) => {
        let result;
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(array[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
    
    const columns = [
        {
            name: 'Date',
            selector:  row => `${ moment(row.entry_date).format(' MMMM Do YYYY') }`,
            sortable: true,
            center: true,
            cell: row => <a className="date-click" onClick={() => handleSelectDay(row.id)}>{moment(row.entry_date).format('MMMM Do YYYY')}</a>
        },
        {   name: 'Clocked In', 
            selector: row => `${ moment(row.clock_in).local().format(' hh:mm A')}`, 
            sortable: true, center: true 
        },
        {   
            name: 'Clocked Out', 
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

    useEffect(() => {
        
        api.get('/get_timesheet/').then(({data}) => {
            setData(data.clock_events);
            setClockingin(data.isClockingin)
            setClockedinDate(data.clockedinDate)
            setMonthlyHr(data.monthly_hrs)
            setWeeklyHr(data.weekly_hrs)
            
        }).catch(res => {
          console.log(res)
        });
    }, []);

    const actionsMemo = useMemo(() => 
        <Export onExport={() => downloadCSV()} />, []
     );

    const handleClockin = ()=>{
        setOpen(true);
    }

    const handleCLockout = ()=>{
        console.log("clockedinDate", clockedinDate)
        setSelected(null)
        setSelectedDate(new Date());
        setOpen(true);
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
    
    const handleSelectDay = async (id) => {

        await api.get(`/edit_clockevent/${id}`).then(({data}) => {
          setSelected(data)
        }).catch(res => {
          console.log('error', res)
        })
    }

    const handleClockinnow =()=>{
        setSelectedDate(new Date())
        handleAddEntry()
    }
    
    const handleAddEntry = async () => {

        var addEntry = true

        if (clockingin){
            console.log("check two date",selectedDate,clockedinDate )
            var check_if_after = moment(selectedDate).isAfter(clockedinDate);
            console.log(check_if_after)
            if(!check_if_after){
                addEntry = false
                setAlertOpen(true);
            }
        }

        if(addEntry){

            await api.post('/create_clock_event', { dateTime: selectedDate}).then(res => {
                console.log(res)
                    console.log(res)
                    var overlapTime = res.data.overlapTime
                    if (overlapTime == true){
                        setAlertOpen2(true);
                    }
                    else{
                        location.reload(); 
                    }
                    handleClose();
                }).catch(res => {
                console.log('Something wrong');
            })

            // 
        }
    
    }

    const handleDestroyTime = async (id) =>{
        await api.post('/delete_clockevent', { id: id }).then(({data}) => {
            setSelected(null)
          }).catch(res => {
            console.log('error', res)
          })
          location.reload();
    }
    
    const currentDate = moment();
    const weekStart = currentDate.clone().startOf('isoWeek');
    const weekEnd = currentDate.clone().endOf('isoWeek');
    

    return ( 
        <React.Fragment>
        <CssBaseline />
        <Collapse in={openalert2}>
            <Alert severity="error"
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setAlertOpen2(false);
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={{ mb: 2 }}
            >  
            <AlertTitle>Please enter a valid Time. </AlertTitle>

            </Alert>
        </Collapse>
        <Container className="home_container">
            <Stack direction="row" spacing={2}>
                <Card sx={{ width: '60%' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Welcome, {currentUser.username}
                        </Typography>
                        <Typography compoent='p'>{currentUser.email}</Typography>

                        { clockingin &&
                            <Typography className="clockedin_ago" variant="subtitle1" gutterBottom component="div">Clocked in {moment(clockedinDate).fromNow()}</Typography>
                        }
                      
                    </CardContent>
                    <CardActions style={{marginBottom: "20px",padding: "8px 16px"}}>
                        { clockingin &&
                            <>
                     
                            <Button variant="contained" color="error" onClick={handleCLockout} startIcon={<AlarmAddIcon />}>
                                Clock Out
                            </Button>
                            </>
                        }
                        { clockingin == false &&
                            <Button variant="contained" color="warning" onClick={handleClockinnow} startIcon={<AlarmAddIcon />}>
                                Clock In
                            </Button>

                         
                        }
                        { clockingin == false &&
                            <Button variant="contained" color="warning" onClick={handleClockin} startIcon={<AlarmAddIcon />}>
                                Clock In & Select
                            </Button>
                        }
                    </CardActions>
                </Card>  

                <Card sx={{ width: '40%' }}>
                    <CardContent>
                        <span className="today_date">Today Date: {moment().format('MMMM Do YYYY')}</span>
                        <Typography gutterBottom variant="p" component="div">
                            Monthly Balance : <strong>{monthlyHr} hours </strong>
                        </Typography>

                        <Typography gutterBottom variant="p" component="div">
                            Current Week Balance
                        </Typography>
                        <Typography compoent='p'>{moment(weekStart).format('MMMM Do YYYY')} .. {moment(weekEnd).format('MMMM Do YYYY')}</Typography>

                        <Typography compoent='h5'><strong>{weeklyHr} hours </strong></Typography>
    
                    </CardContent>
                 
                </Card>   
            </Stack>
            
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
                        actions={actionsMemo}
                />
                </>
            )}
        </Paper>
        </Container>


        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            { clockingin &&
                 <>Select the Clock out time.</>
            }

            { clockingin == false &&
               <>Select the Date and Time.</>
            }
                
            </Typography>
            <br/>
            
            <Collapse in={openalert}>
                <Alert severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setAlertOpen(false);
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


            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                { clockingin &&
                   <>
                   {<Typography className="clockedin_ago" variant="subtitle1" gutterBottom component="div">
           
                        Clocked in: {moment(clockedinDate).local().format('MMMM Do YYYY hh:mm A')}

                       </Typography>}
                   </>
                } 
                {clockingin == false &&
                      <>
                      <DesktopDatePicker
                            label="Date"
                            inputFormat="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            maxDate={new Date()}  //maxDate
                            renderInput={(params) => <TextField {...params} />}
                            />
                      </>
                }
                    
                    <TimePicker
                    label="Time"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                  
                </Stack>
            </LocalizationProvider>
            <br/>
            <Button variant="contained" onClick={handleAddEntry} className="submit_btn" color="success" style={{display: 'inline-block',float: "right"}}>Add</Button>

            </Box>
        </Modal>

        </React.Fragment>
        
  );

}

export default Home;


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
