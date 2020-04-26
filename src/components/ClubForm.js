import React, { useState } from 'react';
import { Form, Input, FormField, Button, Segment, Header, Grid } from 'semantic-ui-react';

export const ClubForm = ({onNewClub}) => {
    const [name, setName] = useState('')
    const [purpose, setPurpose] = useState('');
    return (
        <Grid textAlign='center' style={{ height: '40vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large">
        <Header as='h2' color='gray' textAlign='center'>
            Add A Club
            </Header>
            <Segment stacked>
            <Form.Field>
                <Input fluid icon='users' iconPosition='left' placeholder="club name" value={name} onChange= {e => setName(e.target.value)}/>
            </Form.Field>
            <Form.Field>
            <Input fluid icon='info' iconPosition='left' placeholder="club purpose" value={purpose} onChange= {e => setPurpose(e.target.value)}/>
            </Form.Field>
            <FormField>
                <Button onClick={
                    async () => {
                    const club = {
                        name,
                        purpose
                    };
                    console.log(club)
                    const response = await fetch('/add_club', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(club)
                    })

                    if (response.ok) {
                        console.log("response worked");
                        console.log(response);
                        onNewClub(club);
                        setName('');
                        setPurpose('');
                    }
                }}>submit</Button>
            </FormField>
            </Segment>
        </Form>
        </Grid.Column>
        </Grid>
    )
}