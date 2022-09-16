import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doLike, getAllLikes } from "../../app/features/post/postAction";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
  const { allLikes, likeSuccess } = useSelector((state) => state.post);
  const [images, setImages] = useState([...post.url]);
  const { media, swiperContainer } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLikes());
  }, []);

  useEffect(() => {
    if (likeSuccess) {
      dispatch(getAllLikes());
    }
  }, [likeSuccess, dispatch]);

  const submitLike = () => {
    dispatch(doLike(post.id));
  };

  return (
    <div className="home-card">
      <Card>
        <CardHeader
          avatar={<Avatar src={post.userPic} />}
          title={post.name}
          subheader={post.date}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
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
          {images?.map((url, index) => (
            <SwiperSlide key={index}>
              <CardMedia className={media} image={url} />
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
          <IconButton>
            <CommentIcon />
          </IconButton>
        </CardActions>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.caption}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default PostCard;
