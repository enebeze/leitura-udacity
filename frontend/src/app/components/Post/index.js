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
import TimeAgo from 'timeago-react';

import { Link } from "react-router-dom";

import CommentPost from "./../CommentPost";
import { Divider } from "semantic-ui-react";

class Post extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    fetch(`http://localhost:3001/posts/${this.props.id}/comments`, {
      method: "GET",
      headers: { Authorization: "v1" }
    }).then(result => {
      result.json().then(comments => this.setState({ comments }));
    });
  }

  render() {
    const {
      id,
      title,
      author,
      description,
      category,
      hasComment,
      voteScore,
      timestamp
    } = this.props;
    const { comments } = this.state;
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
                by { `author ${" "}` } 
                <span style={{ fontSize: "x-small" }}> 
                  <TimeAgo datetime={timestamp} /> 
                  {/* { timeago().format(new Date(timestamp) ) }  */}
                </span>
              </Item.Meta>
              <Item.Description>{description}</Item.Description>
              <Item.Extra>
                <Button size="mini" as="div" labelPosition="right">
                  <Button.Group size="mini">
                    <Button size="mini" color="green">
                      <Icon name="like outline" />
                      Like
                    </Button>
                    <Button.Or text={voteScore} />
                    <Button size="mini" color="red">
                      <Icon name="dislike outline" />
                      Not like
                    </Button>
                  </Button.Group>
                  {/* <Label as="a" basic color={colorScore} pointing="left">
                  {voteScore}
                </Label> */}
                </Button>
              </Item.Extra>
              <Item.Extra>
                <Label color="teal" size="tiny">
                  {category}
                </Label>
              </Item.Extra>
            </Item.Content>

            <Item.Content style={{ textAlign: "right" }}>
              {/* <Button.Group floated="right" basic size="mini">
                  <Button icon="edit" />
                  <Button icon="delete" />
                </Button.Group> */}

              <Dropdown icon="block layout">
                <Dropdown.Menu>
                  <Dropdown.Item icon="edit" text="Edit" />
                  <Dropdown.Item icon="delete" text="Delete" />
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

          {comments.map(c => (
            <CommentPost
              key={c.id}
              author={c.author}
              text={c.body}
              date={c.timestamp}
            />
          ))}
          {/* <CommentPost /> */}

          <Form reply>
            <Form.TextArea
              placeholder="Comment"
              style={{ height: 80, minHeight: 80 }}
            />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
              size="mini"
            />
            <Divider />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

export default Post;
