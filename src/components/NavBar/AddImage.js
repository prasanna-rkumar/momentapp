import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AiFillCloseCircle } from 'react-icons/ai';
import { FcAddImage } from 'react-icons/fc';

const AddImage = () => {
  const { isPreviewOpen, togglePreviewModal } = useContext(AppContext);

  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['image/png', 'image/jpeg'];
  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const createPost = () => {
    if (file && caption) {
      console.log('submit')
    }
  }

  return isPreviewOpen && (
    <div className="fixed z-50 top-0 left-0 overflow-hidden bg-black bg-opacity-60 w-screen h-screen flex flex-row justify-center items-center" >
      <div className="w-full max-w-lg text-white flex flex-col gap-3 p-2 rounded-md bg-gray-700">
        <div className="flex flex-row items-center justify-between">
          <AiFillCloseCircle className="invisible" size={36} />
          <h3 className="text-2xl font-medium">Create Post</h3>
          <AiFillCloseCircle onClick={() => {
            togglePreviewModal();
          }} className="text-gray-300" size={36} />
        </div>
        <hr className="border-t-2 border-gray-400 border-opacity-70" />
        <div className="text-left flex flex-col gap-2 items-center">
          <h4 className="font-normal text-gray-200 w-full">Prasanna Kumar</h4>
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full bg-transparent resize-none p-2" placeholder="What's on your mind Prasanna?" />
          {file && <img className="min-w-full rounded-md shadow-xl" alt="preview" src={URL.createObjectURL(file)} />}
          <div className="attachments w-full flex flex-row justify-end">
            <label className="relative -top-2">
              <input className="h-0 w-0 opacity-0" type="file" onChange={handleChange} />
              <FcAddImage className="cursor-pointer mr-2" size={40} />
            </label>
          </div>
          <Button onClick={createPost} isDisabled={file === null || caption === ''}>Post</Button>
        </div>
      </div>
    </div>
  );
}

const Button = ({ children, isDisabled, onClick }) => {
  return <button onClick={onClick} className={`w-full h-9 mb-1 rounded border-2 border-transparent hover:border-blue-200 font-semibold ${isDisabled ? 'text-gray-300 bg-gray-400' : 'bg-blue-500' }`}>
    {children}
  </button>
};

export default AddImage;