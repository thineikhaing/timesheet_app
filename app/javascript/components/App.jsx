import React from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from "./Route";
import AdminRoutes from "./AdminRoute";
import UserProvider from "./UserProvider";
import Box from '@mui/material/Box';
import MenuAppBar from "./TopHeader";

const App = ({ current_user }) =>(
    <Router>
        <React.Fragment>
            <UserProvider current_user={current_user} >
            { current_user.role == "admin" &&
                <Box sx={{ flexGrow: 1 }}>
                    <AdminRoutes/>
                </Box>
            }
            { current_user.role == "user" &&
                <Box sx={{ flexGrow: 1 }}>
                    <MenuAppBar/>
                    <Routes />
                </Box>
            }
            
            </UserProvider>
        </React.Fragment> 
    </Router>
  )

export default App

