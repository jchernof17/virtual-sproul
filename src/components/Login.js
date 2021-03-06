import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, FormField, Button, Segment, Header, Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom'
import { UserContext } from '../UserContext';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
    }, [username, password]);

    const handleLogin = async () => {
        console.log("login clicked")
        let body = {username, password}
        if (username === '' || password === 'password') {
          setError(false);
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            console.log(response);
            setPassword('');
            setUsername('');
            setHelperText('Login Successfully');
            let lUser = {id:4, name:"Jordan"};
            setUser(() => lUser);
            localStorage.setItem('User', JSON.stringify(lUser));
            console.log(lUser);
            console.log(user);
        }
        } else {
          setError(true);
          setHelperText('Incorrect username or password');
          setUser(false);
        }
      };
      const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
          isButtonDisabled || handleLogin();
        }
      };
    if (user) {
        return (<Redirect to="/" />);
    }
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' style={{ fontSize: '5em', padding:'1em 0em' }} textAlign='center'>
                {user ? <Redirect to="/" /> : ''}
            virtual sproul
            </Header>
        <Form size="large">
            <Header as='h2' color='teal' textAlign='center'>
                {user ? <Redirect to="/" /> : ''}
            Log In to your account
            </Header>
            <Segment stacked>
            <Form.Field>
            <Input fluid icon='user' iconPosition='left' placeholder="Your username" value={username} onChange= {e => setUsername(e.target.value)} onKeyPress={e => handleKeyPress(e)}/>
            </Form.Field>
            <Form.Field>
            <Input fluid icon='lock' iconPosition='left' placeholder="Your password" type='password' value={password} onChange= {e => setPassword(e.target.value)} onKeyPress={e => handleKeyPress(e)}/>
            </Form.Field>
            <FormField>
                <Button fluid color='teal' size='large' onClick={
                    async () => {
                    handleLogin()
                    }
                    }>Log In</Button>
            </FormField>
            </Segment>
        </Form>
        </Grid.Column>
        </Grid>       
    )
}