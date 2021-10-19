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
import ResponsiveDrawer from "./AdminMenu";
import Toolbar from '@mui/material/Toolbar';

const AdminDashboard = () => {
    const [currentUser] = useContext(MainContext)  
    const [data, setData] = useState([]);
    return ( 
        <React.Fragment>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
            <ResponsiveDrawer/>
            <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
            >
            <Toolbar />

            <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Welcome, {currentUser.username}
                        </Typography>
                        <Typography compoent='p'>{currentUser.email}</Typography>
                
                    </CardContent>
                    
                </Card>  

            </Box>
        </Box>
    </React.Fragment>
        
  );

}

export default AdminDashboard;


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
