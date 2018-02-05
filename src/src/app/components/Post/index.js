import React from "react";
import { Item, Image, Header, Comment, Form, Button } from "semantic-ui-react";

import CommentPost from "./../CommentPost";

const Post = () => (
  <div style={{
    paddingTop: 40
  }} >
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header as="a">Title</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>
            <Image src="/images/short-paragraph.png" />
          </Item.Description>
          <Item.Extra>[Category]</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>

    <Comment.Group
      size="mini"
      style={{
        paddingTop: 20
      }}
    >
      <Header as="h3" dividing>
        Comments
      </Header>

      <CommentPost />

      <Form reply>
        <Form.TextArea placeholder="Comment" style={{ height: 80, minHeight: 80, }} />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  </div>
);

export default Post;
