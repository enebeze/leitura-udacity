import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import CommentPost from "./../CommentPost";
import { generateId } from "./../../util/helpers";
import _ from "lodash";

import { Modal } from 'antd';

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
import CommentActions from "./../../store/ducks/comment";

const INITIAL_STATE = {
  bodyComment: ""
};

class Post extends Component {
  
  state = INITIAL_STATE;

  addNewComment = () => {
    const comment = {
      id: generateId(),
      timestamp: Date.now(),
      body: this.state.bodyComment,
      author: "enebeze",
      parentId: this.props.post.id
    };

    this.props.commentSave(comment, true, () => this.setState(INITIAL_STATE));
    
  };

  deletePost = () => {

    Modal.confirm({
      title: 'Are you sure delete this post?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => { 
        this.props.postRemove(this.props.post.id) 
      }
    });

  };

  goBack = () => {
    const { history } = this.props;
    this.props.commentClear();
    history.goBack();
  }

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
    
    const comments = _.values(this.props.comments[id]) || [];
    
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
                <Link id="link_title" to={`/${category}/${id}`} style={{ color: "#000" }}>
                  {title}
                </Link>
              </Item.Header>

              <Item.Meta>
                {`by ${author} `}
                <span style={{ fontSize: "x-small" }}>
                  <TimeAgo datetime={timestamp || Date.now()} />
                </span>
              </Item.Meta>
              <Item.Description>{body}</Item.Description>
              <Item.Extra>
                <Button size="mini" as="div" labelPosition="right">
                  <Button.Group size="mini">
                    <Button
                      id="like_btn"
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
                      id="not_like_btn"
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
                    id="edit"
                    icon="edit"
                    text="Edit"
                    onClick={() => this.props.changeModal(this.props.post)}
                  />
                  <Dropdown.Item
                    id="delete"
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
          
            <Header as="h4">
              Comments
              <Label size="mini" color="teal" as="a">
                { comments.length }
              </Label>
            </Header>
          

          {comments.map(c => <CommentPost key={c.id} comment={c} />)}

          {isDetailsPage && (
            <Form id="form_add_comment" reply>
              <Form.TextArea
                placeholder="Comment"
                style={{ height: 80, minHeight: 80 }}
                value={this.state.bodyComment}
                onChange={(e, { value }) =>
                  this.setState({ bodyComment: value })
                }
              />
              <Button
                id="add_comment"
                content="Add Comment"
                labelPosition="left"
                icon="edit"
                primary
                size="mini"
                onClick={this.addNewComment}
              />
              
            </Form>
          )}
        </Comment.Group>
        
        <Divider />

        {isDetailsPage && (
            <Button
              labelPosition="left"
              icon="left chevron"
              content="Back"
              id="back"
              onClick={this.goBack}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comment.comments,
});

const mapDispatchToProps = dispatch => ({
  changeModal: postEdit => dispatch(PostActions.changeModal(postEdit)),
  postRemove: postId => dispatch(PostActions.postRemove(postId)),
  postLikeNotLike: (postId, value) => dispatch(PostActions.postLikeNotLike(postId, value)),

  /* Comment */
  commentClear: postId => dispatch(CommentActions.commentClear(postId)),
  commentSave: (comment, isAdd, callback) => dispatch(CommentActions.commentSave(comment, isAdd, callback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);
