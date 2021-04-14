import { useContext } from 'react';
import { IoIosAddCircle } from 'react-icons/io'
import { AppContext } from '../../contexts/AppContext';
import { galleryAuth } from '../../firebase';

const NavBar = () => {
  const { togglePreviewModal, toggleLoginModal, isAuthenticated } = useContext(AppContext);
  return (
    <nav className="fixed z-40 top-0 left-0  w-full h-14 bg-gray-700 border-b-2 border-gray-500" >
      <div className="flex text-white flex-row justify-between items-center px-4 h-full max-w-5xl m-auto" >
        <h1 className="text-2xl font-semibold text-white">Instabook</h1>
        <div className="flex flex-row items-center gap-4">
          <AnchorButton onClick={() => {
            if (!isAuthenticated) toggleLoginModal();
            else togglePreviewModal();
          }} href="#">
            <IoIosAddCircle size={40} />
          </AnchorButton>
          {isAuthenticated ? <LogoutButton /> : <LoginButton onClick={() => toggleLoginModal()} />}
        </div>
      </div>
    </nav>
  )
};

const LogoutButton = () => (
  <AnchorButton onClick={() => galleryAuth.signOut()} href="/" className="cursor-pointer no-underline">
    <span className="text-sm font-medium">Logout</span>
  </AnchorButton>
);

const LoginButton = ({ onClick }) => (
  <AnchorButton onClick={() => onClick()} href="/" className="cursor-pointer no-underline">
    <span className="text-sm font-medium">Login</span>
  </AnchorButton>
);

const AnchorButton = ({ onClick, href, children }) => (
  <a onClick={(e) => {
    e.preventDefault();
    onClick();
  }} href={href} className="text-gray-300 cursor-pointer no-underline">{children}</a>
);

export default NavBar;