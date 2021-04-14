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
        className="clickable max-w-lg w-full m-auto text-white flex flex-col gap-3 p-2 rounded-md bg-gray-700"
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

  /* const [user, setUser] = useState("");

  useEffect(() => {
    collectionRef.doc(selectedPost.user).get().then((doc) => setUser(doc.data().email.split("@")[0]));
  }, [selectedPost.user])

  const handleClick = (e) => {
    if (e.target.classList.contains('preview-backdrop')) {
      setSelectedPost(null);
    }
  }

  return (
    <motion.div className="flex preview-backdrop fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        className="flex flex-row justify-center items-center m-auto"

      >
        <div
          style={{
            minWidth: '60%',
            minHeight: '80%',
          }}
          className="w-full max-w-lg text-white flex flex-col gap-3 p-2 rounded-md bg-gray-700"
        >
          <div className="text-left flex flex-col gap-2 items-center">
            <h4 className="text-xl font-semibold text-gray-50 w-full">{user}</h4>
            <img className="min-w-full rounded-md shadow-xl object-cover overflow-y-scroll" alt="preview" src={selectedPost.url} />
            <div className="w-full">
              <span className="font-bold">{user}</span>
              {'  '}
              {selectedPost.caption}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  ) */
}

export default Preview;