import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { AiFillCloseCircle } from 'react-icons/ai';
import Button from "./Button";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { firebaseTimestamp, galleryAuth as auth, galleryFirestore } from '../firebase'
import Loading from "./Loading";

const LoginModal = () => {
  const { isLoginModalOpen, toggleLoginModal } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setError] = useState('');

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (user?.additionalUserInfo?.isNewUser) {
      const collectionRef = galleryFirestore.collection('users');
      const createdAt = firebaseTimestamp();
      collectionRef.doc(user.user.uid).set({
        email: user.user.email,
        createdAt,
        updatedAt: createdAt,
      }).catch(err => console.log(err))
    }
  }, [user])

  console.log(error)

  useEffect(() => {
    if (error?.code === 'auth/email-already-in-use') {
      auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user)
          setError('')
        })
        .catch(err => {
          console.log(err)
          setError('The email and password do not match');
        });
    }
  }, [email, error, password]);

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
          {loginError && <span>{loginError}</span>}
          <form onSubmit={(e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(email, password);
          }} className="text-left flex flex-col gap-2 items-center">
            <TextFormField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextFormField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="h-1" />
            <Button onClick={() => { }} isDisabled={email === '' || password === ''}>Login</Button>
          </form>
          <Button isSecondary onClick={() => {
            createUserWithEmailAndPassword("tester@gmail.com", "password");
          }} isDisabled={email === '' || password === ''}>Login with dummy account</Button>
          {/* <div className="flex flex-row justify-between gap-8 items-center px-8">
            <div className="h-px w-full bg-gray-500" />
            <span className="text-white text-opacity-60">OR</span>
            <div className="h-px w-full bg-gray-500" />
          </div> */}
        </div>
      )}
    </div>
  );
}

const TextFormField = ({ type, value, placeholder, onChange }) => (
  <input className="text-white w-full rounded p-1 bg-opacity-50 bg-gray-900" type={type} value={value} placeholder={placeholder} onChange={onChange} />
);

export default LoginModal;