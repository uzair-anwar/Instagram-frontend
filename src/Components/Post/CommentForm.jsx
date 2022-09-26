import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  editComment,
  getPostComment,
  deleteComment,
} from "../../app/features/comment/commentAction";
import "../../StyleSheets/comment-style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletePostComment } from "../../app/features/comment/commentSlice";
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

const CommentForm = ({ comment }) => {
  const [commentText, setCommentText] = useState("");
  const [commentSection, setCommentSection] = useState(false);
  const { deletedComment } = useSelector((state) => state.comment);

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
    dispatch(deleteComment({ id: comment.id, postId: comment.postId })).then(
      () => {
        notify(deletedComment?.message);
        dispatch(deletePostComment({ id: comment.id }));
      }
    );
  };

  return (
    <>
      {commentSection ? (
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
        <>
          <hr />
          <div>
            <h4>Commenter Name: {comment.user.name}</h4>
            <h6>Comment: {comment.body}</h6>
          </div>
        </>
      )}
      <div className="comment">
        <div className="edit-comment" onClick={handleEdit}>
          <AiFillEdit />
        </div>
        <div className="edit-comment" onClick={handleCommentDelete}>
          <AiFillDelete />
        </div>
      </div>
    </>
  );
};
export default CommentForm;
