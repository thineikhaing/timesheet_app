import React, { useContext ,useState, useEffect} from "react";
import { MainContext } from "./UserProvider";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import api from "./Api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components'
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';

const EditProfile = () => {
    const [currentUser, setCurrentUser] = useContext(MainContext);
    const [openalert, setAlertOpen] = React.useState(false);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const handleUserSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target);
        console.log(newPassword,confirmPassword)
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            // make API call
            await api.put(`/users/${currentUser.id}`, formData).then((data) => {
                setCurrentUser(data);
                console.log(currentUser)
                setAlertOpen(true)
                // $(".current_username").text(currentUser.username)
                setTimeout(
                    () => location.reload(), 
                    2000
                  );


            }).catch(res => {
                console.log(res)
            })
        }
      
    }

    return ( 
        <React.Fragment>
        <CssBaseline />
        <Container className="edit_content">
            <Collapse in={openalert}>
                <Alert severity="success"
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
                <AlertTitle>Profile updated successfully</AlertTitle>

                </Alert>
            </Collapse>
            <Card className="card">
                <CardContent>
                {/* <AccessTimeIcon className="clock-icon" /> */}
                <Typography variant="h5" component="h2">Edit Profile</Typography>
                <form onSubmit={handleUserSubmit} >
                    <EditForm>
                        <TextField name="user[username]" label="Username" defaultValue={currentUser.username}/>
                        <br/>
                        <TextField type="email" name="user[email]" label="Email" defaultValue={currentUser.email} InputProps={{readOnly: true,}}/>
                        <br/>
                        <TextField 
                            type="password" 
                            name="user[password]" 
                            label="Password" 
                            onChange={(e) => setNewPassword(e.target.value)}
                   
                            required/>
                        <br/>
                        <TextField 
                            required 
                            type="password" 
                            name="user[password_confirmation]" 
                            label="Password Confirmation"
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            />

                        <div className="button-group">
                        
                        <Button className="submit_btn" type="submit" variant="contained" color="warning">
                            Update
                        </Button>

                        <Button className="text_btn" href="/" type="link" color="warning">
                            Back
                        </Button>

                        </div>
                    </EditForm>
                </form>
                </CardContent>
            </Card>
        </Container>

        </React.Fragment>
        
  );
}

export default EditProfile;

export const EditForm = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 16px;
  
  button, a {
    margin:10px 0 0 5px;
  }
`