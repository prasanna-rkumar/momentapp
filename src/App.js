import { motion } from 'framer-motion';
import './App.css';
import NavBar from './components/NavBar';
import AddImage from './components/NavBar/AddImage';
import LoginModal from './components/LoginModal';
import { AppProvider } from './contexts/AppContext';
import useFirestore from './firebase/hooks/useFirestore';
import Preview from './components/Preview';
import { useState } from 'react';

function App() {
  const { docs } = useFirestore('images');
  const [selectedPost, setSelectedPost] = useState(null);
  return (
    <AppProvider>
      <div className="App">
        <NavBar />
        <AddImage />
        <main className="mt-16 mx-auto max-w-5xl">
          <div className="col-span-6 p-4 grid grid-cols-2 md:grid-cols-3 gap-2" >
            {docs && docs.map((doc) => (
              <Post key={doc.url} post={doc} onClick={() => setSelectedPost(doc)} />
            ))}
          </div>
          <LoginModal />
          {selectedPost && <Preview selectedPost={selectedPost} setSelectedPost={setSelectedPost} />}
        </main>
      </div>
    </AppProvider>
  );
}

const Post = ({ post, onClick }) => (
  <motion.div className="img-wrap cursor-pointer rounded shadow" key={post.id}
    layout
    whileHover={{ opacity: 1 }}
    onClick={onClick}
  >
    <motion.img src={post.url} alt="uploaded pic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    />
  </motion.div>
);

export default App;
