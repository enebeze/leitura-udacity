import React from "react";

import { Segment, Grid, Divider, List, Container, Header } from 'semantic-ui-react';

const Footer = () => (
  <Segment
    inverted
    vertical
    style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
  >
    <Container textAlign="center">
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header inverted as="h4" content="React JS" />
            <List link inverted>
              <List.Item as="a">ReactJS - Facebook</List.Item>
              <List.Item as="a">Blog ReactJS</List.Item>
              <List.Item as="a">News ReactJS</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header inverted as="h4" content="Librarys" />
            <List link inverted>
              <List.Item as="a">Semantict UI React</List.Item>
              <List.Item as="a">React Router Dom</List.Item>
              <List.Item as="a">Redux</List.Item>
              <List.Item as="a">Firebase</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Divider inverted section />
      <List horizontal inverted divided link>
        <List.Item as="a" href="#">
          Site Map
        </List.Item>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer