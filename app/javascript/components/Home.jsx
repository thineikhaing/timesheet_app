import React, { useContext ,useState, useEffect} from "react";
import { MainContext } from "./UserProvider";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
    const [currentUser] = useContext(MainContext)  
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
                    <Button variant="contained" color="success">
                        Clock In
                    </Button>
                </CardActions>
            </Card>
        </Container>
        </React.Fragment>
        
  );

}

export default Home;
