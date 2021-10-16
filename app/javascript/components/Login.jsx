import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components'

export default function Login() {
  return (
    <Container>
      <Card className="card">
        <CardContent>
          {/* <AccessTimeIcon className="clock-icon" /> */}
          <Typography variant="h5" component="h2">Timesheet Application</Typography>
          <Typography component="p">Login</Typography>
          <LoginForm>
            <TextField type="email" name="user[email]" label="Email" />
            <br/>
            <TextField type="password" name="user[password]" label="Password" />
            <div className="button-group">
             
              <Button type="submit" variant="contained" color="primary">
                Log In
              </Button>

              <Button variant="contained" href="/users/sign_up" color="primary">
                Sign Up
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

  .clock-icon {
    font-size:60px;
  }

  .card{
    min-width: 30%;
    text-align:center;
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
