import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  editComment,
  deleteComment,
} from "../../app/features/comment/commentAction";
import "../../StyleSheets/comment-style.css";
import { toast } from "react-toastify";
import {
  deletePostComment,
  editLocalComment,
  removeDeleteStatus,
} from "../../app/features/comment/commentSlice";

const CommentForm = ({ comment }) => {
  const [commentText, setCommentText] = useState("");
  const [commentSection, setCommentSection] = useState(false);
  const { deletedComment, editSuccess } = useSelector((state) => state.comment);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setCommentSection(true);
  };

  useEffect(() => {
    if (deletedComment !== null) {
      if (deletedComment?.status !== 200) {
        toast.error(deletedComment?.message);
      }
      if (deletedComment?.status === 200) {
        toast.success(deletedComment?.message);
      }
      dispatch(removeDeleteStatus());
    }
  }, [deletedComment]);

  useEffect(() => {
    if (editSuccess) {
      dispatch(
        editLocalComment({
          id: comment.id,
          body: commentText,
        })
      );
    }
  }, [editSuccess]);

  const submitEdit = () => {
    dispatch(
      editComment({ id: comment.id, body: commentText, postId: comment.postId })
    );
    setCommentSection(false);
  };

  const handleCommentDelete = async () => {
    await dispatch(
      deleteComment({ id: comment.id, postId: comment.postId })
    ).then(() => {
      console.log(deletedComment?.message);
    });
  };

  return (
    <>
      {commentSection ? (
        <>
          <textarea
            defaultValue={comment?.body}
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
            <h4>Commenter Name: {comment?.user?.name ?? userInfo?.name}</h4>
            <h6>Comment: {comment?.body}</h6>
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
