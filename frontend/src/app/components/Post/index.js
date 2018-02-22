import React, { Component } from "react";
import {
  Item,
  Image,
  Header,
  Comment,
  Form,
  Button,
  Label,
  Menu,
  Icon,
  Container,
  Dropdown
} from "semantic-ui-react";
import TimeAgo from "timeago-react";

import { Link } from "react-router-dom";

import CommentPost from "./../CommentPost";
import { Divider } from "semantic-ui-react";

class Post extends Component {
  state = {
    post: {},
    comments: [],
    bodyComment: ""
  };

  componentDidMount() {
    this.setState({ post: this.props.post });

    fetch(`http://localhost:3001/posts/${this.props.post.id}/comments`, {
      method: "GET",
      headers: { Authorization: "v1" }
    }).then(result => {
      result.json().then(comments => this.setState({ comments }));
    });
  }

  likeNotLike = value => {
    fetch(`http://localhost:3001/posts/${this.state.post.id}`, {
      method: "POST",
      headers: {
        Authorization: "v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ option: value })
    }).then(result => {
      this.setState(prevState => {
        const { post } = prevState;
        post.voteScore = post.voteScore + (value === "upVote" ? 1 : -1);
        return post;
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
      this.S4() +
      this.S4().substr(0, 3)
    ).toLowerCase();
  };

  addNewComment = () => {
    const comment = {
      id: this.generateGuid(),
      timestamp: Date.now(),
      body: this.state.bodyComment,
      author: "enebeze",
      parentId: this.state.post.id
    };

    fetch("http://localhost:3001/comments", {
      method: "POST",
      headers: {
        Authorization: "v1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    }).then(() => {
      this.setState(prevState => {
        const { comments } = prevState;
        comment.voteScore = 1;
        comments.push(comment);
        return comments;
      });
    });
  };

  deletePost = () => {
    fetch(`http://localhost:3001/posts/${this.state.post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "v1"
      }
    });
  };

  render() {
    const {
      id,
      title,
      author,
      body,
      category,
      voteScore,
      timestamp,
      commentCount
    } = this.state.post;

    const { comments } = this.state;
    const hasComment = comments.length > 0;
    const colorScore = voteScore > -1 ? "green" : "red";

    return (
      <div
        style={{
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>
                <Link to={`details/${id}`} style={{ color: "#000" }}>
                  {title}
                </Link>
              </Item.Header>

              <Item.Meta>
                 {`by ${author} `}
                <span style={{ fontSize: "x-small" }}>
                  <TimeAgo datetime={timestamp} />
                  {/* { timeago().format(new Date(timestamp) ) }  */}
                </span>
              </Item.Meta>
              <Item.Description>{body}</Item.Description>
              <Item.Extra>
                <Button size="mini" as="div" labelPosition="right">
                  <Button.Group size="mini">
                    <Button
                      size="mini"
                      color="green"
                      onClick={() => {
                        this.likeNotLike("upVote");
                      }}
                    >
                      <Icon name="like outline" />
                      Like
                    </Button>
                    <Button.Or text={voteScore} />
                    <Button
                      size="mini"
                      color="red"
                      onClick={() => {
                        this.likeNotLike("downVote");
                      }}
                    >
                      <Icon name="dislike outline" />
                      Not like
                    </Button>
                  </Button.Group>
                </Button>
              </Item.Extra>
              <Item.Extra>
                <Label color="teal" size="tiny">
                  {category}
                </Label>
              </Item.Extra>
            </Item.Content>

            <Item.Content style={{ textAlign: "right" }}>
              <Dropdown icon="block layout">
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="edit"
                    text="Edit"
                    onClick={() => this.props.editPost(this.state.post)}
                  />
                  <Dropdown.Item icon="delete" text="Delete" onClick={this.deletePost} />
                </Dropdown.Menu>
              </Dropdown>
            </Item.Content>
          </Item>
        </Item.Group>

        <Comment.Group
          size="mini"
          style={{
            paddingTop: 0,
            maxWidth: "100%"
          }}
        >
          {hasComment && (
            <Header as="h4">
              Comments
              <Label size="mini" color="teal" as="a">
                {comments.length}
              </Label>
            </Header>
          )}

          {comments.map(c => <CommentPost key={c.id} comment={c} />)}

          <Form reply>
            <Form.TextArea
              placeholder="Comment"
              style={{ height: 80, minHeight: 80 }}
              onChange={(e, { value }) => this.setState({ bodyComment: value })}
            />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
              size="mini"
              onClick={this.addNewComment}
            />
            <Divider />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

export default Post;
