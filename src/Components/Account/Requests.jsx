import React from "react";
import { useDispatch } from "react-redux";
import {
  rejectRequest,
  acceptRequest,
} from "../../app/features/user/userAction";
import { deleteRequest } from "../../app/features/user/userSlice";

const Requests = ({ request }) => {
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(acceptRequest({ id: request.id }));
    dispatch(deleteRequest(request.id));
  };
  const handleReject = () => {
    dispatch(rejectRequest({ id: request.id }));
    dispatch(deleteRequest(request.id));
  };
  return (
    <div className="container-fluid">
      <span>Requester name: </span>
      <h2>{request?.requester?.name}</h2>

      <button className="btn btn-outline-primary" onClick={handleAccept}>
        Accept
      </button>

      <button className="btn btn-outline-danger mx-2" onClick={handleReject}>
        Reject
      </button>
      <hr />
    </div>
  );
};

export default Requests;
