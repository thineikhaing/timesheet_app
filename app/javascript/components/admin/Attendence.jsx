import React, { useContext ,useState, useEffect,useMemo} from "react";
import { MainContext } from "../UserProvider";
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ResponsiveDrawer from "./AdminMenu";
import Toolbar from '@mui/material/Toolbar';
import api from "../Api";

const Attendence = () => {
    const [currentUser] = useContext(MainContext)  
    const [data, setData] = useState([]);
    return ( 
        <React.Fragment>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
            <ResponsiveDrawer/>
            <Box component="main"sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        Attendence list
                        </Typography>
                
                    </CardContent>
                    
                </Card>  

            </Box>
        </Box>
    </React.Fragment>
        
  );
}

export default Attendence;