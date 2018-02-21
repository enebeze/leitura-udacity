import React, { Component } from "react";
import TimeAgo from "timeago-react";
import { Comment, Header, Form, Button, Icon } from "semantic-ui-react";

class CommentPost extends Component {

  state = {
    comment: {}
  }

  componentDidMount() {
    this.setState({ comment: this.props.comment });
  }

  likeNotLike = (value) => {
    debugger
    fetch(`http://localhost:3001/comments/${this.state.comment.id}`, {
      method: "POST",
      headers: {
        Authorization: "v1",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option: value })
    }).then(result => {
      this.setState(prevState => {
        const { comment } = prevState;
        comment.voteScore = comment.voteScore + (value === "upVote" ? 1 : -1)
        return comment;
      })
    });

  }

  render() {
    const { author, timestamp, body, voteScore } = this.state.comment;
    return (
      <div>
        <Comment
          style={{
            paddingBottom: 10,
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
                <Comment.Action onClick={() => { this.likeNotLike("upVote") }} >
                  <Icon name="like outline" />
                </Comment.Action>
                <Comment.Action onClick={() => { this.likeNotLike("downVote") }} >
                  <Icon name="dislike outline" />
                </Comment.Action>
              </Comment.Actions>
            </Comment.Metadata>
            <Comment.Text>{body}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Edit</Comment.Action>
              <Comment.Action>Delete</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </div>
    );
  }
}

export default CommentPost;
