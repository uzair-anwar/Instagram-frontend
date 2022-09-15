import React, { useState } from "react";
import { create } from "../Services/Post";
import { useNavigate } from "react-router-dom";

const CretePost = () => {
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createPost = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    await create(formData)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          navigate("/");
        } else if (response.status === 400) {
          setError(response.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
          <span>Uplaod Image</span>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={createPost}
      >
        Submit post
      </button>
      {error !== null ? <div className="error-msg">{error}</div> : null}
    </div>
  );
};

export default CretePost;
