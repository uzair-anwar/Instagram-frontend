import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import "../StyleSheets/navbar-style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../app/features/post/postAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageSwiper from "../Components/Post/ImageSwiper";
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

const EditPost = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = location.state.post;
  const id = post.id;
  const [caption, setCaption] = useState(post.caption);
  const [images, setImages] = useState(post.images);

  const { edit, editSuccess } = useSelector((state) => state.post);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editSuccess) {
      navigate("/");
    }
  }, [editSuccess, navigate]);

  useEffect(() => {
    notify(edit?.message);
  }, [edit]);

  const checkCaption = () => {
    if (caption.length === 0) {
      setError("Caption is required");
      return false;
    }
    return true;
  };

  const handleEditPost = () => {
    if (checkCaption()) {
      dispatch(editPost({ caption, id }));
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center w-50   m-auto">
      <TextField
        id="outlined-basic"
        variant="outlined"
        label="Caption"
        value={caption}
        className="w-100 my-2 pt-1"
        onChange={(e) => setCaption(e.target.value)}
        onClick={() => setError(null)}
      />
      {error ? <div className="error-msg">{error}</div> : null}

      <div className="h-25">
        <ImageSwiper images={images} />
      </div>
      <br />
      <div className="flex m-auto">
        <button className="btn btn-primary" onClick={handleEditPost}>
          Edit post
        </button>
      </div>
    </div>
  );
};

export default EditPost;
