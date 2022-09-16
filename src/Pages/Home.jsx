import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>ramesh</h5>
        <div className="card-image">
          <img
            src="https://res.cloudinary.com/instagram-clone-testproject/image/upload/v1663158422/insta-clone/p3anol9jmzo8e58b1ymg.jpg"
            alt="PostImage"
          ></img>
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p> this is amazing post </p>
          <input type="text" placeholder="add a comment " />
        </div>
      </div>
    </div>
  );
};
export default Home;
