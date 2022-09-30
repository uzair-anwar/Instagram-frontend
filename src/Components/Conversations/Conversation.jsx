import "./conversation.css";

const Conversation = ({ conversation, currentUser }) => {
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={conversation?.follower?.image}
        alt=""
      />
      <span className="conversationName">
        {conversation?.follower?.username}
      </span>
    </div>
  );
};

export default Conversation;
