import "./App.css";
import ChatRoom from "./ChatRoom";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="container">
      {user ? <ChatRoom user={user} /> : <SignIn />}
    </div>
  );
}

export default App;
