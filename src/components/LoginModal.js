import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { AiFillCloseCircle } from 'react-icons/ai';
import Button from "./Button";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { firebaseTimestamp, galleryAuth as auth, galleryFirestore } from '../firebase'
import Loading from "./Loading";

const LoginModal = () => {
  const { isLoginModalOpen, toggleLoginModal } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (error?.code === 'auth/user-not-found') {
      auth.createUserWithEmailAndPassword(email, password)
        .then(({ additionalUserInfo, user }) => {
          if (additionalUserInfo.isNewUser) {
            const createdAt = firebaseTimestamp();
            galleryFirestore.collection('users').doc(user.uid).set({
              email: user.email,
              createdAt,
              updatedAt: createdAt
            })
          }
        })
        .catch((err => console.log(err)))
    }
  }, [user, error, loading, email, password])

  return isLoginModalOpen && (
    <div className="fixed z-50 top-0 left-0 overflow-hidden bg-black bg-opacity-60 w-screen h-screen flex flex-row justify-center items-center" >
      { loading ? (
        <Loading message="Initializing user..." />
      ) : (
        <div className="w-full max-w-lg text-white flex flex-col gap-3 p-2 rounded-md bg-gray-700">
          <div className="flex flex-row items-center justify-between">
            <AiFillCloseCircle className="invisible" size={36} />
            <h3 className="text-2xl font-medium">Sign In</h3>
            <AiFillCloseCircle onClick={() => {
              toggleLoginModal();
            }} className="text-gray-300 cursor-pointer" size={36} />
          </div>
          <hr className="border-t-2 border-gray-400 border-opacity-70" />
          {error && <span>{error.message}</span>}
          <form onSubmit={(e) => {
            e.preventDefault();
            signInWithEmailAndPassword(email, password);
          }} className="text-left flex flex-col gap-2 items-center">
            <TextFormField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextFormField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="h-1" />
            <Button onClick={() => { }} isDisabled={email === '' || password === ''}>Login</Button>
          </form>
          <Button onClick={() => {
            signInWithEmailAndPassword('tester@gmail.com', 'password');
          }} >Login as test user</Button>
        </div>
      )}
    </div>
  );
}

const TextFormField = ({ type, value, placeholder, onChange }) => (
  <input className="text-white w-full rounded p-1 bg-opacity-50 bg-gray-900" type={type} value={value} placeholder={placeholder} onChange={onChange} />
);

export default LoginModal;