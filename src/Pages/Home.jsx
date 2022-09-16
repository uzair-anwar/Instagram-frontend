import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../app/features/post/postAction";
import PostCard from "../Components/Post/PostCard";
const Home = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts == null) {
      dispatch(getAllPost());
    }
  }, [posts, dispatch]);
  return posts?.map((post, index) => (
    <div key={index}>
      <PostCard post={post} />
    </div>
  ));
};
export default Home;
