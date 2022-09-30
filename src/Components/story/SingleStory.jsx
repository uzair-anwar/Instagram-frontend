import React from "react";
import { deleteSingleStory } from "../../app/features/story/storySlice";
import { deleteStory } from "../../app/features/story/storyAction";

import { useDispatch } from "react-redux";

const SingleStory = ({ story }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteStory({ id: story.id }));
    dispatch(deleteSingleStory(story.id));
  };
  return (
    <div className="container-fluid">
      <img src={story.url} alt="Story Pic" />
      <p className="mt-2">For deleting Story, Press</p>

      <button className="btn btn-outline-danger mb-3" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default SingleStory;
