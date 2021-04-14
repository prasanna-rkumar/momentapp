import React from 'react';
import { motion } from 'framer-motion';
import { galleryFirestore } from '../firebase';
import { useEffect, useState } from 'react';

const collectionRef = galleryFirestore.collection('users');

const Preview = ({ setSelectedPost, selectedPost }) => {

  const [user, setUser] = useState("");

  useEffect(() => {
    collectionRef.doc(selectedPost.user).get().then((doc) => setUser(doc.data().email.split("@")[0]));
  }, [selectedPost.user])

  const handleClick = (e) => {
    if (e.target.classList.contains('clickable')) {
      setSelectedPost(null);
    }
  }

  return (
    <motion.div className="backdrop clickable" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="clickable max-w-3xl w-auto m-auto text-white flex flex-col gap-3 p-2 rounded-md bg-gray-700"
        style={{
          maxHeight: '85%',
        }}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <h4>{user}</h4>
        <img src={selectedPost.url} alt="enlarged pic" />
        <div className="w-full">
          <span className="font-bold">{user}</span>
          {'  '}
          {selectedPost.caption}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Preview;