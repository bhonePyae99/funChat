const Message = ({ data, action }) => {
  return (
    <div
      className={
        action === "send"
          ? "message text-end position-relative"
          : "message text-start position-relative"
      }
    >
      {action === "send" ? (
        <div>
          <div className="bg-primary d-inline-block message-content rounded-pill mt-1">
            <div className="fs-6 d-inline-block">{data.text}</div>
          </div>
          <img
            src={data.profile}
            className="ms-2 rounded-circle top-50"
            alt=""
          />
        </div>
      ) : (
        <div>
          <img
            src={data.profile}
            className="me-2 rounded-circle top-50"
            alt=""
          />
          <div className="bg-primary d-inline-block message-content rounded-pill mt-1">
            <div className="fs-6 d-inline-block">{data.text}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
