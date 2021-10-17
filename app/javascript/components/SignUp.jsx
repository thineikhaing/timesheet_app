import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components'

export default function SignUp() {
  return (
    <Container>
      <Card className="card">
        <CardContent>
          {/* <AccessTimeIcon className="clock-icon" /> */}
          <Typography variant="h5" component="h2">Timesheet Application</Typography>
          <Typography className="form_title" component="p">Sign Up</Typography>
          <LoginForm>
            <TextField name="user[username]" label="Username" />
            <br/>
            <TextField type="email" name="user[email]" label="Email" />
            <br/>
            <TextField type="password" name="user[password]" label="Password" />
            <br/>
            <TextField type="password" name="user[password_confirmation]" label="Password Confirmation" />
            <div className="button-group">
             
              <Button className="submit_btn" type="submit" variant="contained" color="warning">
                Sign Up
              </Button>

              <Button className="text_btn" href="/users/sign_in" type="link" color="warning">
                Login
              </Button>
              
            </div>
          </LoginForm>
        </CardContent>
      </Card>
    </Container>
  );
}

export const Container = styled.div`
  height: 100%;
  padding:10px 0;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;

  .submit_btn{
    background: rgb(46, 172, 186) !important;
  }
 

  .card{
    min-width: 360px;
    text-align: center;
    padding: 50px;
    margin-top: 60px;
  }

  .button-group{
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: flex-end;
  }
`

export const LoginForm = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 16px;
  
  button, a {
    margin:10px 0 0 5px;
  }
`
