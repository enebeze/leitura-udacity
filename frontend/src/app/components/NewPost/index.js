import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "antd";

import { Form, Select, TextArea } from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

class NewPost extends Component {

  state = {
    categories: [],
    title: "",
    author: "",
    category: "",
    body: ""
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = () => {
    fetch("http://localhost:3001/categories/", {
      method: "GET",
      headers: { Authorization: "v1" }
    }).then(result => {
      result.json().then(c => {
        const categories = [];
        c.categories.map(cat => {
          categories.push({ text: cat.name, value: cat.path });
        });

        this.setState({ categories });
      });
    });
  };

  S4 = () => {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
  }

  generateGuid = () => {
    return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
  }
 

  addNewPost = () => {

    const post = {
      id: this.generateGuid(),
      title: this.state.title,
      author: this.state.author,
      category: this.state.category,
      body: this.state.body,
      timestamp: _.now()
    }

    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { 
        Authorization: "v1",
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(post)
    }).then(result => {
        console.log("Retorno", result);
    });


  }

  

  render() {

    const { categories } = this.state;

    return (
      <Modal
        title="New Post"
        visible={this.props.showModal}
        onOk={this.addNewPost}
        onCancel={this.props.changeModal}
      >
        <Form>
          <Form.Field>
            <input placeholder="Title"               
              onChange={event => this.setState({ title: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <input placeholder="Author"
              onChange={event => this.setState({ author: event.target.value })} />
          </Form.Field>
          <Form.Field control={Select} 
            onChange={event => this.setState({ category: event.target.innerText }) }
            options={categories} 
            placeholder="Category" />
          <Form.Field
            control={TextArea}
            placeholder="Tell us more about anything..."
            onChange={event => this.setState({ body: event.target.value }) }
          />
        </Form>
      </Modal>
    );
  }
}

export default NewPost;
