import React, { Component } from "react";

import { Modal } from "antd";

import { Form, Select, TextArea } from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

class NewPost extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        title="New Post"
        visible={this.props.showModal}
        onOk={this.props.addNewPost}
        onCancel={this.props.changeModal}
      >
        <Form>
          <Form.Field>
            <input placeholder="Title" />
          </Form.Field>
          <Form.Field>
            <input placeholder="Author" />
          </Form.Field>
          <Form.Field control={Select} options={options} placeholder="Gender" />
          <Form.Field
            control={TextArea}
            placeholder="Tell us more about you..."
          />
        </Form>
      </Modal>
    );
  }
}

export default NewPost;
