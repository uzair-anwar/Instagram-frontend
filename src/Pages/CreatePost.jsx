import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-ui/core";
import "../StyleSheets/navbar-style.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../app/features/post/postAction";

const CreatePost = () => {
  const { error, success } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [navigate, success, dispatch]);

  const fileObj = [];
  const fileArray = [];
  const [caption, setCaption] = useState("");
  const [displayImages, setDisplayImages] = useState([]);
  const [images, setImages] = useState("");
  const [fieldError, setFieldError] = useState(null);

  const uploadMultipleFiles = (e) => {
    fileObj.push(e.target.files);
    setImages(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setDisplayImages(fileArray);
  };

  const checkFields = () => {
    if (caption.length === 0) {
      setFieldError("Caption is required");
      return false;
    }
    if (images.length === 0) {
      setFieldError("Images is required");
      return false;
    }
    if (images.length > 10) {
      setFieldError("Only 10 images are allowed");
      return false;
    }
    return true;
  };

  const uploadPost = () => {
    if (checkFields()) {
      const formData = new FormData();
      formData.append("caption", caption);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      dispatch(createNewPost(formData));
    }
  };

  return (
    <div className="card input-filed create-post">
      <p className="text-xxl-center">Create a Post</p>
      <Input
        className="my-2"
        type="text"
        placeholder="Caption"
        required
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="row">
        {displayImages.map((url, index) => (
          <div className="col-md-4 col-lg-6 col-lg-8" key={index}>
            <img src={url} alt="..." className="img-responsive inline-block" />
          </div>
        ))}
      </div>
      <div className="form-group">
        <input
          type="file"
          className="form-control"
          onChange={uploadMultipleFiles}
          multiple
        />
      </div>

      <br />

      <button className="btn btn-primary" onClick={uploadPost}>
        Submit post
      </button>

      {error !== null ? <div className="error-msg">{error}</div> : null}

      {fieldError ? <div className="error-msg">{fieldError}</div> : null}
    </div>
  );
};

export default CreatePost;
