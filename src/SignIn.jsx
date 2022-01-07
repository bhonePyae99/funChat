import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { auth } from "./firebase-config";
const SignIn = () => {
  //logging user in
  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };
  return (
    <div className="container text-center mt-5 text-light">
      <div className="row justify-content-center">
        <div className="col-md-5 bg-secondary chat-room rounded position-relative">
          <div className="row justify-content-between bg-dark p-2">
            <div className="col-6 text-warning h3 text-start">SuperChat</div>
            <div className="col-3">
              <button className="btn btn-primary btn-sm fs-6" onClick={login}>
                Login
              </button>
            </div>
          </div>
          <div className="row h3 mt-5">
            This is a small chat app created by me for fun. Please login to
            start using it.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
