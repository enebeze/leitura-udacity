import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "antd";

import { Form, TextArea, Dropdown } from "semantic-ui-react";
import { isNull } from "util";

/* Redux Connect */
import { connect } from 'react-redux'

/* Actions Creators */
import PostActions from "./../../store/ducks/posts";

const INITIAL_STATE = {
  titleModal: "New Post",
  id: null,
  title: "",
  author: "",
  category: "",
  body: "",
};

class FormPost extends Component {
  
  state = INITIAL_STATE;

  componentWillReceiveProps(nextProps) {
    
    if (!isNull(nextProps.postState.postEdit)) {
      const { title, author, category, body, id } = nextProps.postState.postEdit;
      this.setState({
        title,
        author,
        category,
        body,
        id,
        titleModal: id ? "Edit Post" : "New Post"
      });
    } else {
      this.setState(INITIAL_STATE);
    }
  }

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

    this.props.postSave(post, true);
  };

  editPost = () => {
    const editPost = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body
    };

    this.props.postSave(editPost, false);
  };

  onCancel = () => {
    this.setState(INITIAL_STATE);
    this.props.changeModal(null);
  };



  render() {
    /* Categories and Posts Redux */
    const { categories } = this.props.categoryState;
    const { showModal } = this.props.postState;


    return (
      <Modal
        title={this.state.titleModal}
        visible={showModal}
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

const mapStateToProps = state => ({
  postState: state.post,
  categoryState: state.category
})

const mapDispatchToProps = dispatch => ({
  changeModal: postEdit => dispatch(PostActions.changeModal(postEdit)),
  postSave: (post, isAdd) => dispatch(PostActions.postSave(post, isAdd)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPost);
