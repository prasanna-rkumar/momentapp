import { useContext } from 'react';
import { IoIosAddCircle } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa';
import { AppContext } from '../../contexts/AppContext';
import { galleryAuth } from '../../firebase';
import Menu from '../Menu'

const NavBar = () => {
  const { togglePreviewModal, toggleLoginModal, setProfilePage, isAuthenticated } = useContext(AppContext);
  return (
    <nav className="fixed z-40 top-0 left-0  w-full h-14 bg-gray-700 border-b-2 border-gray-500" >
      <div className="flex text-white flex-row justify-between items-center px-4 h-full max-w-5xl m-auto" >
        <h1 onClick={(e) => setProfilePage(false)} className="text-2xl transition-transform font-semibold text-white cursor-pointer transform hover:-translate-y-1">Instabook</h1>
        <div className="flex flex-row items-center gap-4">
          <AnchorButton onClick={() => {
            if (!isAuthenticated) toggleLoginModal();
            else togglePreviewModal();
          }} href="#">
            <IoIosAddCircle size={40} />
          </AnchorButton>
          {
            isAuthenticated
              ? (
                <Menu title={<FaUserCircle className=" relative top-1" size={32} />} menuItems={[
                  (
                    <AnchorButton onClick={() => setProfilePage(true)}>
                      My Photos
                    </AnchorButton>
                  ),
                  (
                    <AnchorButton onClick={() => {
                      galleryAuth.signOut();
                      setProfilePage(false);
                    }}>
                      Logout
                    </AnchorButton>
                  ),
                ]} />
              )
              :
              (
                <AnchorButton onClick={() => toggleLoginModal()}>
                  Login
                </AnchorButton>
              )
          }
        </div>
      </div>
    </nav>
  )
};

const AnchorButton = ({ onClick, children }) => (
  <div onClick={() => {
    onClick();
  }} className="cursor-pointer no-underline text-sm font-medium w-full h-full px-2">{children}</div>
);

export default NavBar;