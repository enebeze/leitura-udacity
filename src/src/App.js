import React, { Component } from "react";
import Post from "./app/components/Post";
import CommentPost from "./app/components/CommentPost";
import Footer from "./app/components/Footer";

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
  Item,
  Comment,
  Form,
  Select,
  TextArea
} from "semantic-ui-react";

import { Modal } from "antd";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

class App extends Component {
  state = {
    showModal: false
  };

  changeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  addNewPost = () => {
    this.changeModal();
  };

  render() {
    return (
      <div>
        <Menu style={{ background: "#02acfe" }} fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <Image
                size="mini"
                src="/favicon.ico"
                style={{ marginRight: "1.5em" }}
              />
              Leitura Udacity by Ebenézer
            </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>

            <Dropdown item simple text="Dropdown">
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item position="right">
              <Button as="a" primary style={{ marginLeft: "0.5em" }}>
                Sign Up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>

        <Container text style={{ marginTop: "7em" }}>
          <Button basic color="blue" fluid onClick={this.changeModal}>
            New post
          </Button>
          {/* <Header as="h1">Semantic UI React Fixed Template</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for
        single column layouts.
      </p> */}

        <Post />
        <Post />
        <Post />
        <Post />
        </Container>
        <Footer />

        <Modal
          title="New Post"
          visible={this.state.showModal}
          onOk={this.addNewPost}
          onCancel={this.changeModal}
        >
          <Form>
            <Form.Field>
              <input placeholder="Title" />
            </Form.Field>
            <Form.Field>
              <input placeholder="Author" />
            </Form.Field>
            <Form.Field
              control={Select}
              options={options}
              placeholder="Gender"
            />
            <Form.Field
              control={TextArea}
              placeholder="Tell us more about you..."
            />
          </Form>
        </Modal>
      </div>
    );
  }
}

export default App;
