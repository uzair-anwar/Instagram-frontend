import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import CommentForm from "./CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { createNewComment } from "../../app/features/comment/commentAction";

const Comment = ({ post }) => {
  const { postComment } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [commentError, setCommentError] = useState(null);
  const [commentText, setCommentText] = useState("");

  const checkComment = () => {
    if (commentText.length === 0) {
      setCommentError("Comment is required");
      return false;
    }
    return true;
  };

  const handleComment = () => {
    if (checkComment()) {
      dispatch(createNewComment({ postId: post.id, body: commentText }));
      setCommentText("");
      setCommentError(null);
    }
  };

  return (
    <div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          maxRows={4}
          placeholder="Comment here"
          className="w-75"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onClick={() => setCommentError(null)}
        />
        <button
          className="btn btn-outline-primary mt-2"
          onClick={handleComment}
        >
          Comment
        </button>
        {commentError ? <div className="error-msg">{commentError}</div> : null}
      </div>
      <div className="comment-section">
        {postComment?.map((comment, index) => (
          <div key={index}>
            <CommentForm comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
