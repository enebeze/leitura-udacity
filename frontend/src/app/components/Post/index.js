import React, { Component } from "react";
import { Item, Image, Header, Comment, Form, Button } from "semantic-ui-react";

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
    const { id, title, author, description, category, hasComment } = this.props;
    const { comments } = this.state;

    return (
      <div
        style={{
          paddingTop: 40
        }}
      >
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as="a">{title}</Item.Header>
              <Item.Meta>by {author}</Item.Meta>
              <Item.Description>
                {/* <Image src="/images/short-paragraph.png" /> */}
                {description}
              </Item.Description>
              <Item.Extra>[{category}]</Item.Extra>
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
            <Header as="h3">
              Comments
            </Header>
          )}

          {comments.map(c => (
            <CommentPost key={c.id} author={c.author} text={c.body} date={c.timestamp} />
          ))}
          {/* <CommentPost /> */}

          <Form reply>
            <Form.TextArea
              placeholder="Comment"
              style={{ height: 80, minHeight: 80 }}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
            <Divider />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

export default Post;
