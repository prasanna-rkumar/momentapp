import { useContext } from 'react';
import { IoIosAddCircle } from 'react-icons/io'
import { AppContext } from '../../contexts/AppContext';

const NavBar = () => {
  const { togglePreviewModal } = useContext(AppContext);
  return (
    <nav className="fixed z-40 top-0 left-0 flex text-white flex-row justify-between items-center px-4 w-full h-14 bg-gray-700 border-b-2 border-gray-500" >
      <h1 className="text-2xl font-semibold text-white">Instabook</h1>
      <div> <IoIosAddCircle className="text-gray-300" onClick={() => togglePreviewModal()} size={40} /> </div>
    </nav>
  )
};

export default NavBar;