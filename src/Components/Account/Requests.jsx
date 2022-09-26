import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  rejectRequest,
  acceptRequest,
} from "../../app/features/user/userAction";
import { deleteRequest } from "../../app/features/user/userSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const notify = (message) => {
//   toast.error(message, {
//     position: "top-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// };

const Requests = ({ request }) => {
  //   const { rejectStatus, acceptStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     notify(rejectStatus);
  //   }, [rejectStatus, acceptStatus]);

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
