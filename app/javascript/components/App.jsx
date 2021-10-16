import React from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from "./Route";
import UserProvider from "./UserProvider";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuAppBar from "./TopHeader";

const App = ({ current_user }) =>(
    <Router>
        <React.Fragment>
            <UserProvider current_user={current_user} >
            <MenuAppBar/>
            <Box sx={{ flexGrow: 1 }}>
                
                <Grid spacing={1} container item xs={12}>
                    
                    <Grid item xs={12} >
                        
                        {Routes}
                    </Grid>
                </Grid>
            </Box>
            
            </UserProvider>
        </React.Fragment> 
    </Router>
  )

export default App

