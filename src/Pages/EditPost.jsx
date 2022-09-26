import React, { useState, useEffect } from "react";
import "../StyleSheets/navbar-style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../app/features/post/postAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [displayImages, setDisplayImages] = useState(post.images);
  const { edit, editSuccess } = useSelector((state) => state.post);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editSuccess) {
      navigate("/");
    }
  }, [editSuccess, navigate]);

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
    <div className="card input-filed create-post">
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="row">
        {displayImages.map((image, index) => (
          <div key={index}>
            <img
              src={image.url}
              alt="..."
              className="img-responsive inline-block"
            />
          </div>
        ))}
      </div>

      <br />

      <button className="btn btn-primary" onClick={handleEditPost}>
        Edit post
      </button>
      {edit !== null ? <div className="error-msg">{edit.message}</div> : null}

      {error ? <div className="error-msg">{error}</div> : null}
    </div>
  );
};

export default EditPost;
