import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import { deleteSinglePost } from "../../app/features/post/postSlice";
import Comment from "./Comment";
import ImageSwiper from "./ImageSwiper";
import { toast } from "react-toastify";

import { deletePost, doLike } from "../../app/features/post/postAction";
import { getPostComment } from "../../app/features/comment/commentAction";
import "../../StyleSheets/navbar-style.css";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";

const PostCard = ({ post }) => {
  const { deleteSuccess, deleteResult, likes } = useSelector(
    (state) => state.post
  );
  const { editComment } = useSelector((state) => state.comment);

  const [images] = useState(post.images);
  const [likeCount, setLikeCount] = useState(post?.likes?.length);
  const [commentSection, setCommentSection] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteSuccess && deleteResult != null)
      toast.error(deleteResult?.message);
  }, [deleteSuccess, deleteResult, dispatch]);

  useEffect(() => {
    if (editComment != null) toast.error(editComment?.message);
  }, [editComment]);

  useEffect(() => {
    if (likes != null) {
      if (likes?.status == 201) setLikeCount((prev) => prev + 1);
      else if (likes?.status == 202) setLikeCount((prev) => prev - 1);
    }
  }, [likes]);

  const submitLike = () => {
    dispatch(doLike(post.id));
  };

  const handledDeletePost = () => {
    dispatch(deletePost(post.id));
    dispatch(deleteSinglePost({ id: post.id }));
  };

  const handleCommentSection = (check) => {
    if (commentSection === false) {
      dispatch(getPostComment({ postId: post.id }));
      setCommentSection(true);
    } else {
      setCommentSection(false);
    }
  };

  return (
    <div className="home-card">
      <Card>
        <CardHeader
          avatar={<Avatar src={post?.user?.image} />}
          title={post?.user?.name}
          subheader={format(post?.createdAt)}
          action={
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <NavLink
                    className="text-decoration-none"
                    to={"/Post/" + post.id + "/edit"}
                    state={{ post: post }}
                  >
                    Edit
                  </NavLink>
                </Dropdown.Item>

                <Dropdown.Item onClick={handledDeletePost}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
        />

        <ImageSwiper images={images} />

        <CardActions disableSpacing>
          <span onClick={submitLike}>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </span>

          {likeCount}
          <span onClick={handleCommentSection}>
            <IconButton>
              <CommentIcon />
            </IconButton>
          </span>
        </CardActions>

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Caption
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {post.caption}
          </Typography>
        </CardContent>
        {commentSection ? <Comment post={post} /> : null}
      </Card>
    </div>
  );
};
export default PostCard;
