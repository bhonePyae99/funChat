import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  orderBy,
  serverTimestamp,
  query,
  limit,
} from "firebase/firestore";
import Message from "./Message";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRef } from "react";

const ChatRoom = ({ user }) => {
  const dummy = useRef();
  //getting mesages
  const messageRef = collection(db, "messages");
  const q = query(messageRef, orderBy("createdAt"), limit(25));
  const [messagesData] = useCollection(q);
  let messages = [];
  if (messagesData) {
    messages = messagesData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
  //logging user out
  const logout = async () => {
    await signOut(auth);
  };
  //sending messages
  const sendMessage = async (e) => {
    e.preventDefault();
    const messageRef = collection(db, "messages");
    const message = {
      text: e.target.message.value,
      uid: user.uid,
      createdAt: serverTimestamp(),
      profile: user.photoURL,
    };
    await addDoc(messageRef, message);
    e.target.message.value = "";
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="container text-center mt-5 text-light">
      <div className="row justify-content-center">
        <div className="col-md-5 bg-secondary chat-room position-relative">
          <div className="row justify-content-between bg-dark p-2 position-relative">
            <div className="col-6 text-warning text-start">
              <h5>funChat</h5>
              <p className="text-success">Login as: {user.displayName}</p>
            </div>
            <div className="col-3">
              <button className="btn btn-primary btn-sm fs-6" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
          <div className="mt-3 message-body">
            {messages &&
              messages.map((message) => (
                <Message
                  key={message.id}
                  data={message}
                  action={
                    message.uid === auth.currentUser.uid ? "send" : "recv"
                  }
                />
              ))}
            <div ref={dummy}></div>
          </div>
          <form onSubmit={sendMessage}>
            <div className="input-group input-group send-input start-50 translate-middle-x px-2">
              <input
                type="text"
                name="message"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
              <div className="input-group-prepend">
                <button className="btn btn-primary">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
