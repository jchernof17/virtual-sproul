import React from 'react';
import { List, Header, Segment, Grid } from 'semantic-ui-react';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';

export const Clubs = ({ clubs }) => {
    console.log(clubs)
    return (
    <List>
        <Grid container stackable verticalAlign='middle' centered>
        <Grid.Row stretched>
        
        {clubs.map(club => {
            console.log(club)
            return (
                <Grid.Column width={5} height={10} style={{padding:'1.5em'}}>
                <Segment textAlign='center' raised padded>
                <List.Item key={club.name}>
                    <Header as="h3">{club.name}</Header>
                    <HeaderSubHeader>{club.purpose}</HeaderSubHeader>
                </List.Item>
                </Segment>
                </Grid.Column>
            )
        })}
        
        </Grid.Row>
        </Grid>
    </List>
    );
}