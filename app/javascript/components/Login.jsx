import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from 'styled-components'


export default function Login() {
  return (
    <Box sx={{ flexGrow: 1 }}>         
      <Grid spacing={1} container item xs={12}>
        <Grid item xs={12}  >
          <Container >
            <Card className="card">
              <CardContent>
                {/* <AccessTimeIcon className="clock-icon" /> */}
                <Typography variant="h5" component="h2">Timesheet Application</Typography>
                <Typography className="form_title" component="p">Login Form</Typography>
                <LoginForm>
                  <TextField type="email" name="user[email]" label="Email" />
                  <br/>
                  <TextField type="password" name="user[password]" label="Password" />
                  <div className="button-group">
                  
                    <Button className="submit_btn" type="submit" variant="contained" color="warning">
                      Log In
                    </Button>

                    <Button type="link" className="text_btn" href="/users/sign_up" color="warning">
                      Sign Up
                    </Button>
                    
                  </div>
                </LoginForm>
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export const Container = styled.div`
  height: 100%;
  padding:10px 0;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;

  .text_btn{
    color: rgb(46, 172, 186) !important;
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
