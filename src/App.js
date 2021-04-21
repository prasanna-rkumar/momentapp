import { motion } from 'framer-motion';
import './App.css';
import NavBar from './components/NavBar';
import AddImage from './components/NavBar/AddImage';
import LoginModal from './components/LoginModal';
import { AppContext } from './contexts/AppContext';
import useFirestore from './firebase/hooks/useFirestore';
import Preview from './components/Preview';
import { useState, useContext } from 'react';

function App() {
  const { isProfilePage } = useContext(AppContext);
  const { docs } = useFirestore(isProfilePage);
  const [selectedPost, setSelectedPost] = useState(null);
  return (
    <div className="App">
      <NavBar />
      <AddImage />
      <main className="mt-16 mx-auto max-w-5xl">
        <h1 key="title" className="text-3xl font-semibold text-blue-200 p-4 pb-0">{isProfilePage ? 'My photos' : 'Feed'}</h1>
        <div className="col-span-6 p-4 grid grid-cols-2 md:grid-cols-3 gap-2" >
          {docs && docs.map((doc) => {
            return (
              <Post key={doc.url} post={doc} onClick={() => setSelectedPost(doc)} />
            );
          })}
        </div>
        <LoginModal />
        {selectedPost && <Preview selectedPost={selectedPost} setSelectedPost={setSelectedPost} />}
      </main>
    </div>
  );
}

const Post = ({ post, onClick }) => (
  <motion.div className="img-wrap cursor-pointer rounded shadow opacity-60" key={post.id}
    layout
    whileHover={{ opacity: 1 }}
    onClick={onClick}
  >
    <motion.img src={post.url} alt="uploaded pic" className="object-cover object-center absolute top-0 left-0 min-h-full min-w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    />
  </motion.div>
);

export default App;
