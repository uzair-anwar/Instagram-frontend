import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";

import {
  deletePost,
  doLike,
  getAllLikes,
  getAllPost,
} from "../../app/features/post/postAction";

import {
  createNewComment,
  getPostComment,
} from "../../app/features/comment/commentAction";

import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@material-ui/core/styles";
import "../../StyleSheets/navbar-style.css";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";

import SwiperCore, {
  Keyboard,
  Scrollbar,
  Pagination,
  Navigation,
} from "swiper/core";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteSinglePost } from "../../app/features/post/postSlice";
toast.configure();

const notify = (message) => {
  if (message !== undefined) {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const useStyles = makeStyles({
  media: {
    height: "50%",
    paddingTop: "100%",
  },
  swiperContainer: {
    paddingBottom: "3rem",
    "& .swiper-pagination-bullet": {
      background: "blue",
    },
    "& .swiper-button-next:after": {
      fontSize: "2rem !important",
    },
    "& .swiper-button-prev:after": {
      fontSize: "2rem !important",
    },
  },
});

SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation]);

const PostCard = ({ post }) => {
  const { deleteResult, deleteSuccess, allLikes, likeSuccess } = useSelector(
    (state) => state.post
  );
  const { commentSuccess, deletedSuccess, editSuccess, postComment } =
    useSelector((state) => state.comment);
  const [images, setImages] = useState(post.images);
  const [commentSection, setCommentSection] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState(null);
  const { media, swiperContainer } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLikes());
  }, []);

  useEffect(() => {
    if (deleteSuccess) dispatch(getAllPost());
  }, [deleteSuccess, dispatch]);

  useEffect(() => {
    if (likeSuccess) {
      dispatch(getAllLikes());
    }
  }, [likeSuccess, dispatch]);

  useEffect(() => {
    if (editSuccess || deletedSuccess || commentSuccess)
      dispatch(getPostComment({ postId: post.id }));
  }, [editSuccess, commentSuccess, deletedSuccess]);

  const submitLike = () => {
    dispatch(doLike(post.id));
  };

  const checkComment = () => {
    if (commentText.length === 0) {
      setCommentError("Comment is required");
      return false;
    }
    return true;
  };

  const handledDeletePost = () => {
    dispatch(deletePost(post.id)).then(() => {
      notify(deleteResult?.message);
      dispatch(deleteSinglePost({ id: post.id }));
    });
  };

  const handleCommentSection = (check) => {
    if (commentSection == false) {
      setCommentSection(true);
    } else {
      setCommentSection(false);
    }
    dispatch(getPostComment({ postId: post.id }));
  };

  const handleComment = () => {
    if (checkComment()) {
      dispatch(createNewComment({ postId: post.id, body: commentText }));
      setCommentText("");
      setCommentError(null);
    }
  };

  return (
    <div className="home-card">
      <Card>
        <CardHeader
          avatar={<Avatar src={post?.user?.image} />}
          title={post?.user?.name}
          subheader={post?.createdAt}
          action={
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <NavLink
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

        <Swiper
          grabCursor
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          navigation
          loop
          className={swiperContainer}
        >
          {images?.map((element, index) => (
            <SwiperSlide key={index}>
              <CardMedia className={media} image={element.url} />
            </SwiperSlide>
          ))}
        </Swiper>
        <CardActions disableSpacing>
          <span onClick={submitLike}>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </span>

          {allLikes?.[post?.id]}
          <span onClick={handleCommentSection}>
            <IconButton>
              <CommentIcon />
            </IconButton>
          </span>
        </CardActions>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.caption}
          </Typography>
        </CardContent>
        {commentSection ? (
          <>
            {postComment?.map((comment, index) => (
              <div key={index}>
                <CommentForm comment={comment} />
              </div>
            ))}
            <div>
              <textarea
                placeholder="Comment here"
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleComment}>
                Comment
              </button>
              {commentError ? (
                <div className="error-msg">{commentError}</div>
              ) : null}
            </div>
          </>
        ) : null}
      </Card>
    </div>
  );
};
export default PostCard;
