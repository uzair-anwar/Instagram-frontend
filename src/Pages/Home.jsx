import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../app/features/post/postAction";
import { getFollowings } from "../app/features/user/userAction";
import PostCard from "../Components/Post/PostCard";
import UserStoryPic from "../Components/story/UserStoryPic";
import { unSuccess } from "../app/features/story/storySlice";

import "../StyleSheets/story-style.css";
const Home = () => {
  const { posts, deleteSuccess, editSuccess } = useSelector(
    (state) => state.post
  );
  const { userInfo, followings } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFollowings());
    dispatch(unSuccess());
  }, []);

  useEffect(() => {
    if (posts == null || deleteSuccess || editSuccess) {
      dispatch(getAllPost());
    }
  }, [posts, dispatch, deleteSuccess, editSuccess]);

  const handleStory = () => {
    navigate("/createStory");
  };
  return (
    <>
      <div className="img-list">
        <div className="img-container">
          <div className="image" onClick={handleStory}>
            <img
              src={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8BAQGQkJCRkZH8/PwEBATi4uLr6+uHh4dZWVmEhIS1tbWioqKVlZVDQ0OysrLAwMC/v790dHRvb28cHBw5OTno6OhTU1NcXFxGRkZOTk4fHx+lpaXZ2dk3NzecnJz8LEaDAAADdElEQVR4nO3d61abQBRA4cEMhNwIUWPUan3/t+wMpt5CwMgZz4G1P9dq/ZXOXkNIKAw4BwAAAAAAAAAAAAAATnl//Dv+eN2xJOHP/D4h81W5qPb7Q7maaw9FXpiz+j57t6i1RyQrvOmKh9CVf2isnqe0qXq3Dnn5p8Ise9IelhQfLLMToXY5kVkMm2h5Gti40h6bDO+22Zfts5nDsNVmK+3BifDzMzMY3WmPTsR1R+HNFN6Kxdm8uOkWY09sdjOnb8J3pfYIhwqFtx19WXarPcKhvC/adqQfFNpDHMi7unMKs2ynPcSBmu9rndbaQxxs1lM40x7gYFc9heP/5kYhhfZRSKF9FFJoH4UU2kchhfZRSKF9FFJoH4UU2kchhfZRSKF9FFJoH4UU2kchhfb1XTFkrjBel37RFaHdc5hfUOhf1xOldvG/sOmZw02KUQ5T1Our79s89szh42b2TeHF1nXSizXj1lmU3RfEpvenjJFJNtbwovOui9J/z3WiK/y9W2Vxs+q84je9ZgAJ1mn4jpUvvy7JgqIQuNSevQ9y+Wv8vXuKi8+MiAMRX/n2rF11Qnr94oN20Gdhe6pkC2tDb8JGGI7sQtt7a4XBQjJwnhnaz7yRWxHerJE0Jxf93DfzYf/JUrBwoR3TSu6N6F2lHdOqEit0bq8d0+qvYOH05/CgHdPqIFjYck8EdbnovnSlndNqK1jYddMAPYJ3ufEmPxAlv5f2r1fWIHhs4Y+f+Ya+e8sfH8Z7P1g6usjFj/Hj/9NYkmdr6RuieWOficsUZ2nMHELlsgdObywdB2+T3LMvvOTdzcVj6ds9/WT3dXOX8DRisZQ993R5322Z9gRbjNyJnj88bL7/YrOXXXNqLeFtJX+w/+o7B/yzO39YuvXS9K/FoJBC+yik0D4KKbSPQgrto5BC+yik0D4KKbSPQgrto5BC+yik0D4KKbSPQgrto3D8haO7L8bFpj+H0y9Mc9WXHf3P7HrRHuJgu57CsT93resBj6/G/uw8F59/2HWZ7Oiff+jc1J9h6fo209FvpNH12cu582k8S7a5XcGZwGk8D9h3rM9Ms27it/njgqKv85hq5YuOcuqB7d/d1rYWFQxVVP9n7vhn9aw9JGHe1R/XEi/qSc1fI97Qblsu9vvqsFzN0y7tAQAAAAAAAAAAAAAAUPIPR8AudC1NyrEAAAAASUVORK5CYII="
              }
              alt="UserPic"
            />
            <span className="story-username">{userInfo?.name}</span>
          </div>
          {followings?.map((user, index) => (
            <div key={index}>
              <UserStoryPic user={user} />
            </div>
          ))}
        </div>
      </div>
      {posts?.map((post, index) => (
        <div key={index}>
          <PostCard post={post} />
        </div>
      ))}
    </>
  );
};
export default Home;
