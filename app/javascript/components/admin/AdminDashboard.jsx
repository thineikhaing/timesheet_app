import React, { useContext ,useState, useEffect,useMemo} from "react";
import { MainContext } from "../UserProvider";
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DataTable from 'react-data-table-component';
import Paper from '@mui/material/Paper';
import api from "../Api";
import ResponsiveDrawer from "./AdminMenu";
import Toolbar from '@mui/material/Toolbar';
import { withRouter } from "react-router-dom";

const AdminDashboard = ({ history }) => {
    const [currentUser] = useContext(MainContext)  
    const [data, setData] = useState([]);

    useEffect(() => {
        
        api.get('/initial_retrieve').then(({data}) => {
            setData(data.users);
        }).catch(res => {
          console.log(res)
        });
    }, []);

    const handleSelect = (id) =>{
      history.push(`/user_attendence/${id}`)
    }

    const columns = [
        {
            name: 'User Name',
            selector:  row => `${ row.username }`,
            sortable: true,
            center: true,
            cell: row => <a className="date-click" onClick={() => handleSelect(row.id)}>{row.id-1}</a>
        },
        {   name: 'User Name', 
            selector: row => `${ row.username}`, 
            sortable: true, center: true 
        },
        {   
            name: 'Email', 
            selector: row => `${ row.email}`,
            sortable: true, center: true },
    
        {   name: 'Status', 
            selector:  row => `${ row.clocked_in_status }`, 
            sortable: true, center: true },
        {
            name: "Actions",
            cell: row => <div style={{ display: 'flex' }}><Button onClick={() => handleSelect(row.id)}>Edit</Button> </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            }
    ];

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
            <br/> 
            <Paper style={{padding: "12px"}}>
            {data && (
                <>
                <br/>
                <Typography gutterBottom variant="h5" component="div">
                    {data.length > 1 &&
                    <>
                        Total Staffs: <strong>{data.length-1}</strong>
                    </>
                    }
                       
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
    </React.Fragment>
        
  );

}

export default withRouter(AdminDashboard);


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
          textAlign: 'left'
          // paddingLeft: '0 8px',
        },
      },
  };
