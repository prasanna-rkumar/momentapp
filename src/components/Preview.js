import { motion } from 'framer-motion';
import { firestoreArrayRemove, firestoreArrayUnion, galleryAuth, galleryFirestore } from '../firebase';
import { useEffect, useState, useContext } from 'react';
import js_ago from 'js-ago';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { AppContext } from '../contexts/AppContext';

const collectionRef = galleryFirestore.collection('users');

const Preview = ({ setSelectedPost, selectedPost }) => {

  const [user, setUser] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const { toggleLoginModal, isAuthenticated } = useContext(AppContext);

  useEffect(() => {
    collectionRef.doc(selectedPost.user).get().then((doc) => setUser(doc.data().email.split("@")[0]));
  }, [selectedPost.user])

  useEffect(() => {
    if (!isAuthenticated) return;
    selectedPost.reactors.forEach((reactor) => {
      setIsLiked(reactor.id === galleryAuth.currentUser.uid);
    })
  }, [selectedPost.reactors, isAuthenticated]);

  const handleClick = (e) => {
    if (e.target.classList.contains('clickable')) {
      setSelectedPost(null);
    }
  }

  return (
    <motion.div className="backdrop clickable z-40" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="clickable relative max-w-2xl w-full m-auto text-white flex flex-col gap-3 p-2 rounded-md bg-gray-700"
        style={{
          maxHeight: '85%',
        }}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <div className="flex justify-start items-center m-0 gap-2">
          <img className="rounded-full" width={42} height={42} src={`https://ui-avatars.com/api/?name=${user}&background=random`} alt="name avatar" />
          <h4 className="font-semibold text-lg">{user}</h4>
        </div>
        <img className="preview-img" src={selectedPost.url} alt="enlarged pic" />
        <div>
          <div className="mb-2">
            <button onClick={() => {
              if (!isAuthenticated) {
                toggleLoginModal();
                return;
              }
              const docRef = galleryFirestore.collection('images').doc(selectedPost.id);
              galleryFirestore.runTransaction((transaction) => {
                return transaction.get(docRef).then((snap) => {
                  const likerDocRef = galleryFirestore.collection('users').doc(galleryAuth.currentUser.uid)
                  let value = firestoreArrayUnion(likerDocRef);
                  if (isLiked) {
                    value = firestoreArrayRemove(likerDocRef)
                  }
                  transaction.update(docRef, 'reactors', value)
                  setIsLiked(prev => !prev)
                })
              })
            }}>
              {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
          <div className="w-full">
            <span className="font-bold">{user}</span>
            {'  '}
            {selectedPost.caption}
          </div>
          <p style={{ fontSize: 10 }} className="text-gray-400 tracking-wide font-medium uppercase">{js_ago(selectedPost.createdAt.seconds)}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Preview;