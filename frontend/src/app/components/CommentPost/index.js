import React from "react";

import { Comment, Header, Form, Button } from 'semantic-ui-react';

const CommentPost = ({ author, date, text, }) => (
  <div>
    {/* <Comment.Group size="mini" style={{
      paddingTop: 20
    }} >
      <Header as="h3" dividing>
        Comments
      </Header> */}

      <Comment>
        {/* <Comment.Avatar src="/images/avatar/small/matt.jpg" /> */}
        <Comment.Content>
          <Comment.Author as="a">{author}</Comment.Author>
          <Comment.Metadata>
            <div>
              {/* Today at 5:42PM */}
              {new Date(date).toDateString()}
            </div>
          </Comment.Metadata>
          <Comment.Text>{text}</Comment.Text>
          {/* <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions> */}
        </Comment.Content>
      </Comment>

      {/* <Comment>
        <Comment.Avatar src="/images/avatar/small/elliot.jpg" />
        <Comment.Content>
          <Comment.Author as="a">Elliot Fu</Comment.Author>
          <Comment.Metadata>
            <div>Yesterday at 12:30AM</div>
          </Comment.Metadata>
          <Comment.Text>
            <p>This has been very useful for my research. Thanks as well!</p>
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment> */}

      {/* <Comment>
        <Comment.Avatar src="/images/avatar/small/joe.jpg" />
        <Comment.Content>
          <Comment.Author as="a">Joe Henderson</Comment.Author>
          <Comment.Metadata>
            <div>5 days ago</div>
          </Comment.Metadata>
          <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment> */}

      
    {/* </Comment.Group> */}
  </div>
);

export default CommentPost