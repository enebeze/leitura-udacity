import React, { Component } from "react";
import TimeAgo from "timeago-react";
import { Comment, Header, Form, Button, Icon } from "semantic-ui-react";

class CommentPost extends Component {
  state = {
    editComment: false,
    bodyEdit: "",
    comment: {}
  };

  componentDidMount() {
    this.setState({ comment: this.props.comment });
  }

  likeNotLike = value => {
    fetch(`http://localhost:3001/comments/${this.state.comment.id}`, {
      method: "POST",
      headers: {
        Authorization: "v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ option: value })
    }).then(result => {
      this.setState(prevState => {
        const { comment } = prevState;
        comment.voteScore = comment.voteScore + (value === "upVote" ? 1 : -1);
        return comment;
      });
    });
  };

  editComment = () => {
    this.setState({ editComment: true, bodyEdit: this.state.comment.body });
  };

  cancelEdit = () => {
    this.setState({ editComment: false, bodyEdit: "" });
  };

  updateComment = () => {

    const c = {
      timestamp: Date.now(),
      body: this.state.bodyEdit
    }

    fetch(`http://localhost:3001/comments/${this.state.comment.id}`, {
      method: "PUT",
      headers: {
        Authorization: "v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(c)
    }).then(result => {
      this.setState(prevState => {
        const { comment } = prevState;
        comment.body = c.body
        comment.timestamp = c.timestamp
        return comment;
      });
      this.cancelEdit();
    });
  }

  deleteComment = () => {
    fetch(`http://localhost:3001/comments/${this.state.comment.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "v1"
      }
    }).then(result => {
      
    });
  }

  render() {
    const { author, timestamp, body, voteScore } = this.state.comment;
    return (
      <div>
        <Comment
          style={{
            paddingBottom: 10
          }}
        >
          {/* <Comment.Avatar src="/images/avatar/small/matt.jpg" /> */}
          <Comment.Content>
            <Comment.Author as="a">{author}</Comment.Author>
            <Comment.Metadata>
              <TimeAgo datetime={timestamp} />
              <div>
                <Icon name="star" />
                {voteScore}
              </div>
              <Comment.Actions>
                <Comment.Action
                  onClick={() => {
                    this.likeNotLike("upVote");
                  }}
                >
                  <Icon name="like outline" />
                </Comment.Action>
                <Comment.Action
                  onClick={() => {
                    this.likeNotLike("downVote");
                  }}
                >
                  <Icon name="dislike outline" />
                </Comment.Action>
              </Comment.Actions>
            </Comment.Metadata>
            {this.state.editComment ? (
              <div>
                <Form.TextArea
                  placeholder="Comment"
                  value={this.state.bodyEdit}
                  style={{ marginTop: 8, marginBottom: 6, height: 50, minHeight: 50, width: 300 }}
                  onChange={(e, { value }) =>
                    this.setState({ bodyEdit: value })
                  }
                />
                <Comment.Actions>
                  <Comment.Action onClick={this.updateComment} >Save</Comment.Action>
                  <Comment.Action onClick={this.cancelEdit}>
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
                  <Comment.Action onClick={this.deleteComment} >Delete</Comment.Action>
                </Comment.Actions>
              </div>
            )}
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}

export default CommentPost;
