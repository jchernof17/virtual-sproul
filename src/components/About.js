import React, { useState, useEffect } from 'react';
import { Form, Input, FormField, Button, Segment, Header, Grid, Container, List, Divider, Image, Icon } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom'

export const About = () => (
    <React.Fragment>
    <Segment>
    <Header as='h2'>About</Header>
    <p>This website was built for the HackNow hackathon in April, 2020 :)</p>
    </Segment>

    
    <Segment secondary style={{ margin: '0em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={5}>
            <Header as='h1' style={{ fontSize: '5em' }}>
              Virtual Sproul
            </Header>
            <Header as='h4' style={{ fontSize: '1.5em' }}>
              Explore clubs at UC Berkeley with ease
            </Header>
          </Grid.Column>
          <Grid.Column floated='right' width={11} fluid>
            <Image fluid src='http://www.rhaa.com/uploads/5771bdd519369.jpg' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center' width={7}>
          <Link to="/clubs">
            <Button size='huge' color='orange'>Explore Virtual Sproul</Button>
          </Link>
          </Grid.Column>
          <Grid.Column textAlign='center' width={2}>
            <Header as='h4'><em>or</em></Header>
          </Grid.Column>
          <Grid.Column textAlign='center' width={7}>
              <Link to="/clubs">
            <Button size='huge' color='orange'>Create your flyers</Button>
              </Link>
          </Grid.Column>
          
        </Grid.Row>
        
      </Grid>
    </Segment>

    

  <Segment style={{ padding: '8em 0em' }} vertical>
    <Container text>
      <Header as='h3' style={{ fontSize: '2em' }}>
        This website features a React frontend, using ReactHooks, and a Flask server
      </Header>
      <p style={{ fontSize: '1.33em' }}>
        Pages load lightning fast as state is maintained in the frontend logic
        </p>
      <Button as='a' size='large'>
        Watch Video
      </Button>

      <Divider
        as='h4'
        className='header'
        horizontal
        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
      >
        <a href='#'>Sustain a Community during these times</a>
      </Divider>

      <Header as='h3' style={{ fontSize: '2em' }}>
        It's never been harder to recruit for college clubs
      </Header>
      <p style={{ fontSize: '1.33em' }}>
        COVID-19 has caused us all to adapt quickly to an all-online college. Let's build the tools to keep up.
      </p>
      <Button as='a' size='large'>
        Link to DevPost Submission
      </Button>
    </Container>
  </Segment>

  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              {/* <List.Item as='a'>Sitemap</List.Item>
              <List.Item as='a'>Contact Us</List.Item>
              <List.Item as='a'>Religious Ceremonies</List.Item>
              <List.Item as='a'>Gazebo Plans</List.Item> */}
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Services' />
            <List link inverted>
              {/* <List.Item as='a'>Banana Pre-Order</List.Item>
              <List.Item as='a'>DNA FAQ</List.Item>
              <List.Item as='a'>How To Access</List.Item>
              <List.Item as='a'>Favorite X-Men</List.Item> */}
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' inverted>
              {/* Footer Header */}
            </Header>
            <p>
              {/* Extra space for a call to action inside the footer that could help re-engage users. */}
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
</React.Fragment>
)