import React, { Component } from "react";
import TimeAgo from "timeago-react";
import { Comment, Form, Icon } from "semantic-ui-react";
import { Modal } from "antd";

/* Redux */
import { connect } from "react-redux";

/* Actions Creators */
import CommentActions from "./../../store/ducks/comment";

/* Component state */
const INITIAL_STATE = {
  editComment: false,
  bodyEdit: "",
};

class CommentPost extends Component {

  state = INITIAL_STATE

  /* Update comment */
  updateComment = () => {
    const comment = {
      id: this.props.comment.id,
      timestamp: Date.now(),
      body: this.state.bodyEdit
    };
    // save comment
    this.props.commentSave(comment, false, this.clearState);
  };

  /* Delete comment */
  deleteComment = () => {
    Modal.confirm({
      title: 'Are you sure delete this comment?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => { this.props.commentRemove(this.props.comment.id) }
    });
  }

  /* Edit comment */
  editComment = () => this.setState({ editComment: true, bodyEdit: this.props.comment.body });
  /* Like not like comment */
  likeNotLike = value => this.props.commentLikeNotLike(this.props.comment.id, value);
  /* Back state to state initial */
  clearState = () => this.setState(INITIAL_STATE);

  render() {
    /* propertys  */
    const { author, timestamp, body, voteScore } = this.props.comment;

    return (
      <div>
        <Comment style={{ paddingBottom: 10 }}>
          {/* <Comment.Avatar src="/images/avatar/small/matt.jpg" /> */}
          <Comment.Content>
            <Comment.Author as="a">{author}</Comment.Author>
            <Comment.Metadata>
              <TimeAgo datetime={timestamp || Date.now() } />
              <div>
                <Icon name="star" />
                {voteScore}
              </div>
              <Comment.Actions>
                
                <Comment.Action onClick={() => { this.likeNotLike("upVote"); }} >
                  <Icon name="like outline" />
                </Comment.Action>

                <Comment.Action onClick={() => { this.likeNotLike("downVote"); }}>
                  <Icon name="dislike outline" />
                </Comment.Action>

              </Comment.Actions>
            </Comment.Metadata>
            {this.state.editComment ? (
              <div>
                <Form.TextArea
                  placeholder="Comment"
                  value={this.state.bodyEdit}
                  style={{
                    marginTop: 8,
                    marginBottom: 6,
                    height: 50,
                    minHeight: 50,
                    width: 300
                  }}
                  onChange={(e, { value }) => this.setState({ bodyEdit: value })} />
                <Comment.Actions>
                  <Comment.Action onClick={this.updateComment}>
                    Save
                  </Comment.Action>
                  <Comment.Action onClick={this.clearState}>
                    Cancel
                  </Comment.Action>
                </Comment.Actions>
              </div>
            ) : (
              <div>
                <Comment.Text>{body}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action onClick={this.editComment}>
                    Edit
                  </Comment.Action>
                  <Comment.Action onClick={this.deleteComment}>
                    Delete
                  </Comment.Action>
                </Comment.Actions>
              </div>
            )}
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  /* Comment Actions */
  commentSave: (comment, isAdd, callback) => dispatch(CommentActions.commentSave(comment, isAdd, callback)),
  commentRemove: commentId => dispatch(CommentActions.commentRemove(commentId)),
  commentLikeNotLike: (commentId, voteScore) => dispatch(CommentActions.commentLikeNotLike(commentId, voteScore)),
})

/* Connect commponent to redux */
export default connect(null, mapDispatchToProps)(CommentPost);
