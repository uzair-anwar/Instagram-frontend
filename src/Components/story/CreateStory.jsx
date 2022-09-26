import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStory } from "../../app/features/story/storyAction";

const CreateStory = () => {
  const { success } = useSelector((state) => state.story);

  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate("/");
  }, [success]);

  const uploadStory = () => {
    const formData = new FormData();
    formData.append("image", image);
    dispatch(createUserStory(formData));
  };

  return (
    <div className="container input-filed my-5">
      <div className="form-group">
        <input
          type="file"
          className="form-control"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button className="btn btn-primary my-2" onClick={uploadStory}>
        Create Story
      </button>
    </div>
  );
};

export default CreateStory;
