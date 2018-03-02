import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import CommentPost from "./../CommentPost";
import { generateId } from "./../../util/helpers";

import {
  Item,
  Header,
  Comment,
  Form,
  Button,
  Label,
  Icon,
  Dropdown,
  Divider
} from "semantic-ui-react";

/* Redux */
import { connect } from "react-redux";

/* Actions Creators */
import PostActions from "./../../store/ducks/posts";

class Post extends Component {
  state = {
    comments: [],
    bodyComment: ""
  };

  componentDidMount() {
    const { isDetailsPage } = this.props;

    if (isDetailsPage) {
      fetch(`http://localhost:3001/posts/${this.props.post.id}/comments`, {
        method: "GET",
        headers: { Authorization: "v1" }
      }).then(result => {
        result.json().then(comments => this.setState({ comments }));
      });
    }
    
  }

  addNewComment = () => {
    const comment = {
      id: generateId(),
      timestamp: Date.now(),
      body: this.state.bodyComment,
      author: "enebeze",
      parentId: this.props.post.id
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
        prevState.bodyComment = "";
        return prevState;
      });
    });
  };

  deletePost = () => {
    this.props.postRemove(this.props.post.id);
  };

  render() {
    const {
      id,
      title,
      author,
      body,
      category,
      voteScore,
      timestamp
    } = this.props.post;

    const { comments } = this.state;
    const hasComment = comments.length > 0;
    const { isDetailsPage } = this.props;

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
                <Link to={`/${category}/${id}`} style={{ color: "#000" }}>
                  {title}
                </Link>
              </Item.Header>

              <Item.Meta>
                {`by ${author} `}
                <span style={{ fontSize: "x-small" }}>
                  <TimeAgo datetime={timestamp || Date.now()} />
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
                        this.props.postLikeNotLike(id, "upVote");
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
                        this.props.postLikeNotLike(id, "downVote");
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
                    onClick={() => this.props.changeModal(this.props.post)}
                  />
                  <Dropdown.Item
                    icon="delete"
                    text="Delete"
                    onClick={this.deletePost}
                  />
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
          {isDetailsPage && (
            <Form reply>
              <Form.TextArea
                placeholder="Comment"
                style={{ height: 80, minHeight: 80 }}
                value={this.state.bodyComment}
                onChange={(e, { value }) =>
                  this.setState({ bodyComment: value })
                }
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
          )}
        </Comment.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categorySelected: state.post.categorySelected,
})

const mapDispatchToProps = dispatch => ({
  changeModal: postEdit => dispatch(PostActions.changeModal(postEdit)),
  postRemove: postId => dispatch(PostActions.postRemove(postId)),
  postLikeNotLike: (postId, value) => dispatch(PostActions.postLikeNotLike(postId, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);
