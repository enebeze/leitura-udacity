import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "antd";
import { generateId } from "./../../util/helpers";
import { Form } from "semantic-ui-react";
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
  categoryError: false,
};

class FormPost extends Component {
  
  state = INITIAL_STATE;

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


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

  savePost = () => {

    if (!this.state.category) {
      this.setState({ categoryError: true })
      return
    };

    if (!this.state.id) {
      this.addPost();
    } else {
      
      this.editPost();
    }
  };

  addPost = () => {
    const post = {
      id: generateId(),
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

    const { id, title, author, category, body } = this.state;

    return (
      <Modal
        title={this.state.titleModal}
        visible={showModal}
        footer={null}
        onCancel={this.onCancel}
      >
        <Form onSubmit={this.savePost} >
          <Form.Input required placeholder='Title' name='title' value={title} onChange={this.handleChange} />
          <Form.Input required disabled={id ? true : false} placeholder='Author' name='author' value={author} onChange={this.handleChange} />
          
          
          <Form.Dropdown 
              error={this.state.categoryError}
              disabled={id ? true : false}
              value={category}
              onChange={this.handleChange}
              name="category"
              placeholder="Category"
              selection
              options={categories} />

          <Form.TextArea required placeholder='Tell us more about anything' name='body' value={body} onChange={this.handleChange} />

          <Form.Group>
            <Form.Button primary content='Submit'>Save</Form.Button>
            <Form.Button type="button" onClick={this.onCancel} >Cancel</Form.Button>
          </Form.Group>
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
