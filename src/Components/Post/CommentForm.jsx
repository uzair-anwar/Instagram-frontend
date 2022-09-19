import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  editComment,
  getPostComment,
  deleteComment,
} from "../../app/features/comment/commentAction";

const CommentForm = ({ comment }) => {
  const [commentText, setCommentText] = useState("");
  const [commentSection, setCommentSection] = useState(false);

  const dispatch = useDispatch();

  const handleEdit = () => {
    setCommentSection(true);
  };

  const submitEdit = () => {
    dispatch(
      editComment({ id: comment.id, body: commentText, postId: comment.postId })
    );
    dispatch(getPostComment({ postId: comment.postId }));
    setCommentSection(false);
  };

  const handleCommentDelete = () => {
    dispatch(deleteComment({ id: comment.id, postId: comment.postId }));
    dispatch(getPostComment({ postId: comment.postId }));
  };
  return (
    <>
      {commentSection === true ? (
        <>
          <textarea
            defaultValue={comment.body}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="btn btn-danger" onClick={submitEdit}>
            Edit
          </button>
        </>
      ) : (
        <h6>{comment.body}</h6>
      )}
      <div>
        <span onClick={handleEdit}>
          <AiFillEdit />
        </span>
        <span onClick={handleCommentDelete}>
          <AiFillDelete />
        </span>
      </div>
    </>
  );
};
export default CommentForm;
