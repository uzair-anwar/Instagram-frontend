import React, { useState, useEffect } from "react";
import Stories from "react-insta-stories";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserStories } from "../../app/features/story/storyAction";
import { removeStory } from "../../app/features/story/storySlice";

const Story = () => {
  const { story } = useSelector((state) => state.story);
  const [storyFlag, setStoryFlag] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [urls, setUrls] = useState([]);

  useEffect(() => {
    dispatch(getUserStories({ userId }));
    if (story !== null) {
      for (const element of story) {
        setUrls((arr) => [...arr, element.url]);
      }
    }
  }, []);

  const handleStoryFlag = () => {
    dispatch(removeStory());
    navigate("/");
  };

  return urls.length > 0 ? (
    <Stories
      stories={urls}
      defaultInterval={1500}
      width={"100%"}
      height={"100%"}
      onAllStoriesEnd={handleStoryFlag}
    />
  ) : (
    <h1>You have no stories</h1>
  );
};

export default Story;
