import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "antd";

import { Form, Select, TextArea, Dropdown } from "semantic-ui-react";
import { isNull } from "util";

const initialState = {};

class FormPost extends Component {
  state = {
    titleModal: "New Post",
    categories: [],
    title: "",
    author: "",
    category: "",
    body: "",
    id: null
  };

  componentDidMount() {
    this.getAllCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (!isNull(nextProps.post)) {
      const { title, author, category, body, id } = nextProps.post;
      this.setState({
        title,
        author,
        category,
        body,
        id,
        titleModal: id ? "Edit Post" : "New Post"
      });
    }
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
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  generateGuid = () => {
    return (
      this.S4() +
      this.S4() +
      "-" +
      this.S4() +
      "-4" +
      this.S4().substr(0, 3) +
      "-" +
      this.S4() +
      "-" +
      this.S4() +
      this.S4() +
      this.S4()
    ).toLowerCase();
  };

  savePost = () => {
    if (!this.state.id) {
      this.addPost();
    } else {
      this.editPost();
    }
  };

  addPost = () => {
    const post = {
      id: this.generateGuid(),
      title: this.state.title,
      author: this.state.author,
      category: this.state.category,
      body: this.state.body,
      timestamp: _.now()
    };

    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        Authorization: "v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    });
  };

  editPost = () => {
    const editPost = {
      title: this.state.title,
      body: this.state.body
    };

    fetch(`http://localhost:3001/posts/${this.state.id}`, {
      method: "PUT",
      headers: {
        Authorization: "v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editPost)
    });
  };

  onCancel = () => {
    this.setState({
      title: "",
      author: "",
      category: "",
      body: "",
      id: null,
      titleModal: "New Post"
    });
    this.props.changeModal(null);
  };

  render() {
    const { categories } = this.state;

    return (
      <Modal
        title={this.state.titleModal}
        visible={this.props.showModal}
        onOk={this.savePost}
        onCancel={this.onCancel}
      >
        <Form>
          <Form.Field>
            <input
              placeholder="Title"
              value={this.state.title}
              onChange={event => this.setState({ title: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <input
              disabled={this.state.id ? true : false}
              placeholder="Author"
              value={this.state.author}
              onChange={event => this.setState({ author: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <Dropdown
              disabled={this.state.id ? true : false}
              value={this.state.category}
              onChange={(e, { value }) => this.setState({ category: value })}
              placeholder="Category"
              selection
              options={categories}
            />
          </Form.Field>

          <Form.Field
            control={TextArea}
            value={this.state.body}
            placeholder="Tell us more about anything..."
            onChange={event => this.setState({ body: event.target.value })}
          />
        </Form>
      </Modal>
    );
  }
}

export default FormPost;
