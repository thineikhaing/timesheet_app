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

const EditProfile = () => {
    const [currentUser, setCurrentUser] = useContext(MainContext);
    console.log(currentUser)
    const handleUserSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData(e.target);
        await api.put(`/users/${currentUser.id}`, formData).then((data) => {
            setCurrentUser(data);
            location.reload()
        }).catch(res => {
            console.log(res)
        })
      }

    return ( 
        <React.Fragment>
        <CssBaseline />
        <Container className="edit_content">
            <Card className="card">
                <CardContent>
                {/* <AccessTimeIcon className="clock-icon" /> */}
                <Typography variant="h5" component="h2">Edit Profile</Typography>
                <form onSubmit={handleUserSubmit} >
                    <EditForm>
                        <TextField name="user[username]" label="Username" defaultValue={currentUser.username}/>
                        <br/>
                        <TextField type="email" name="user[email]" label="Email" defaultValue={currentUser.email} InputProps={{
                readOnly: true,
            }}/>
                        <br/>
                        {/* <TextField type="password" name="user[password]" label="Password" defaultValue=''/>
                        <br/>
                        <TextField type="password" name="user[password_confirmation]" label="Password Confirmation" /> */}
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