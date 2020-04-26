import React from 'react';
import { List, Header, Segment, Grid, Image } from 'semantic-ui-react';
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader';




export const Clubs = ({ clubs }) => {
    
const imageMap = {
    1: "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26733971_1907114342936491_6142953865052599975_n.png?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=QH2bcvuZHSsAX-annEv&_nc_ht=scontent-iad3-1.xx&oh=8338c61a0cb620281fc61c8a68b4942f&oe=5ECACE53"
    ,
    2: "https://www.pinmart.com/assets/1/6/DimRegular/44_1k_17.jpg?14319",
    5: "https://scontent-iad3-1.xx.fbcdn.net/v/t31.0-8/1496028_596756000394715_1601777297_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=--Pe_xTuNq0AX_IK2OZ&_nc_ht=scontent-iad3-1.xx&oh=2713bd932a0c8062028a097676f3f4f8&oe=5ECADCAE"
    ,
    6: "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/12662511_777391012392876_7271399535288096708_n.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=ju8TE_q-L3gAX8ST5Zz&_nc_ht=scontent-iad3-1.xx&oh=17a756ab7aea8a4b9bde9f6747f17676&oe=5ECBAC4C"
    ,
    7: "https://sierra.sfo2.cdn.digitaloceanspaces.com/assets/hacknow/branding/footer-logo.png"
}
    console.log(clubs)
    return (
    <List>
        <Grid container stackable verticalAlign='middle' centered>
        <Grid.Row stretched>
        
        {clubs.map(club => {
            console.log(club)
            let id = club.id;
            return (
                <Grid.Column width={5} height={10} style={{padding:'1.5em'}}>
                <Segment textAlign='center' raised padded>
                <List.Item key={club.name}>
                <Image square centered fluid size="medium"src={imageMap[id]}></Image>
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