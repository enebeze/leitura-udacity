import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "antd";
import { generateId } from "./../../util/helpers";
import { Form } from "semantic-ui-react";

/* Redux Connect */
import { connect } from "react-redux";

/* Actions Creators */
import PostActions from "./../../store/ducks/posts";
import FormActions from "./../../store/ducks/form";

const INITIAL_STATE = {
  categoryError: false
};

class FormPost extends Component {
  
  state = INITIAL_STATE;

  /* change state for redux */
  handleChange = (e, { name, value }) => this.props.handleChange(name, value);

  savePost = () => {
    /* validate category */
    if (!this.props.formState.postEdit.category) {
      this.setState({ categoryError: true });
      return;
    }

    /* save post */
    if (!this.props.formState.postEdit.id) {
      this.addPost();
    } else {
      this.editPost();
    }
  };

  addPost = () => {
    /* receive post */
    const post = this.props.formState.postEdit;
    post.id = generateId();
    post.author = this.props.user.author;
    post.photoURL = this.props.user.photoURL
    post.timestamp = _.now();
    
    /* save post */
    this.props.postSave(post, true);
  };

  editPost = () => {
    /* receive paths */
    const { id, title, body } = this.props.formState.postEdit;
    const postEdit = { id, title, body };
    /* save post */
    this.props.postSave(postEdit, false);
  };

  onCancel = () => {
    this.props.changeModal();
  };

  render() {
    /* Categories and Posts Redux */
    const { categories } = this.props.categoryState;
    const { postEdit, showModal } = this.props.formState;

    return (
      <Modal
        title={postEdit.id ? "Edit Post" : "New Post"}
        visible={showModal}
        footer={null}
        onCancel={this.onCancel}
      >
        <Form id="form_save" onSubmit={this.savePost}>
          <Form.Input
            required
            placeholder="Title"
            name="title"
            value={postEdit.title}
            onChange={this.handleChange}
          />
          <Form.Input
            id="author"
            required
            disabled={true}
            placeholder="Author"
            name="author"
            value={this.props.user.author}
          />

          <Form.Dropdown
            id="category"
            error={this.state.categoryError}
            disabled={postEdit.id ? true : false}
            value={postEdit.category}
            onChange={this.handleChange}
            name="category"
            placeholder="Category"
            selection
            options={categories}
          />

          <Form.TextArea
            required
            placeholder="Tell us more about anything"
            name="body"
            value={postEdit.body}
            onChange={this.handleChange}
          />

          <Form.Group>
            <Form.Button id="save" primary>Save</Form.Button>
            <Form.Button id="cancel" type="button" onClick={this.onCancel}>
              Cancel
            </Form.Button>
          </Form.Group>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categoryState: state.category,
  formState: state.form,
  user: state.auth.user || { }
});

const mapDispatchToProps = dispatch => ({
  changeModal: postEdit => dispatch(FormActions.changeModal(postEdit)),
  postSave: (post, isAdd) => dispatch(PostActions.postSave(post, isAdd)),
  handleChange: (name, value) => dispatch(FormActions.handleChange(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPost);
