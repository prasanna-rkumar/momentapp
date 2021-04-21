import { motion } from 'framer-motion';
import { firebaseTimestamp, firestoreArrayRemove, firestoreArrayUnion, galleryAuth, galleryFirestore } from '../firebase';
import { useEffect, useState, useContext } from 'react';
import js_ago from 'js-ago';
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from 'react-icons/ai'
import { IoIosSend } from 'react-icons/io';
import { FiMoreVertical } from 'react-icons/fi';
import { AppContext } from '../contexts/AppContext';
import Comments from './Comments';
import Menu from './Menu';

const collectionRef = galleryFirestore.collection('users');

const Preview = ({ setSelectedPost, selectedPost }) => {

  const [user, setUser] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState('');
  const { toggleLoginModal, isAuthenticated } = useContext(AppContext);

  // real-time likes counter
  useEffect(() => {
    const unsub = galleryFirestore
      .collection('images')
      .doc(selectedPost.id)
      .onSnapshot((snapshot) => {
        setLikesCount(snapshot.data()?.reactors?.length)
      });
    return () => unsub();
  }, [selectedPost.id])

  // build username from user-email
  useEffect(() => {
    collectionRef.doc(selectedPost.user).get().then((doc) => setUser(doc.data().email.split("@")[0]));
  }, [selectedPost.user])

  // like button color decider
  useEffect(() => {
    if (!isAuthenticated) return;
    if (!selectedPost.reactors) return;
    selectedPost.reactors.forEach((reactor) => {
      setIsLiked(reactor.id === galleryAuth.currentUser.uid);
    })
  }, [selectedPost, isAuthenticated]);

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
        className="clickable relative max-w-2xl w-full m-auto text-white rounded-md p-2 bg-gray-700 overflow-y-auto"
        style={{
          maxHeight: '85%',
        }}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <div style={{
          zIndex: -1
        }} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex justify-start items-center m-0 gap-2">
              <img className="rounded-full" width={42} height={42} src={`https://ui-avatars.com/api/?name=${user}&background=random`} alt="name avatar" />
              <h4 className="font-semibold text-lg">{user}</h4>
            </div>
            {
              (selectedPost.user === galleryAuth.currentUser?.uid)
              && (
                <Menu
                  title={<FiMoreVertical size={28} />}
                  menuItems={[
                    (
                      <button className="w-full" onClick={() => {
                        if (selectedPost.user !== galleryAuth.currentUser.uid) return;
                        galleryFirestore.collection('images').doc(selectedPost.id).delete().then(() => setSelectedPost(null))
                      }}>
                        <AiFillDelete className="inline" size={22} /> Delete post
                      </button>
                    ),
                  ]}
                />
              )
            }
          </div>
          <img className="preview-img" src={selectedPost.url} alt="enlarged pic" />
          <div>
            <button onClick={() => {
              if (!isAuthenticated) {
                toggleLoginModal();
                return;
              }
              const docRef = galleryFirestore.collection('images').doc(selectedPost.id);
              galleryFirestore.runTransaction((transaction) => {
                setIsLiked(prev => !prev)
                return transaction.get(docRef).then(() => {
                  const likerDocRef = galleryFirestore.collection('users').doc(galleryAuth.currentUser.uid)
                  let value = firestoreArrayUnion(likerDocRef);
                  if (isLiked) {
                    value = firestoreArrayRemove(likerDocRef)
                  }
                  transaction.update(docRef, 'reactors', value);
                  transaction.update(docRef, 'updatedAt', firebaseTimestamp());
                })
              })
            }}>
              {isLiked ? <AiFillHeart color="#ED4956" size={28} /> : <AiOutlineHeart size={28} />}
            </button>
            {likesCount > 0 ? <p>{likesCount} like{likesCount > 1 && 's'}</p> : null}
            <div className="w-full">
              <span className="font-bold">{user}</span>
              {'  '}
              {selectedPost.caption}
            </div>
            <p style={{ fontSize: 10 }} className="text-gray-400 tracking-wide font-medium uppercase">{js_ago(selectedPost.createdAt.seconds)}</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!isAuthenticated) {
              toggleLoginModal();
              return;
            }
            const commenterDocRef = galleryFirestore.collection('users').doc(galleryAuth.currentUser.uid)
            galleryFirestore.collection('images').doc(selectedPost.id).collection('comments').add({
              body: comment,
              user: commenterDocRef,
              createdAt: firebaseTimestamp(),
            }).then(() => setComment(''))
          }} className="border-t-2 border-gray-400 pt-1.5 pb-0.5 flex justify-between items-center">
            <input value={comment} onChange={(e) => setComment(e.target.value)} className="w-full pl-2 h-8 bg-transparent outline-none" type="text" placeholder="Add a comment..." />
            <button disabled={comment === ''} className="disabled:opacity-30 mr-2 disabled:cursor-not-allowed">
              <IoIosSend size={26} />
            </button>
          </form>
        </div>
        <Comments postId={selectedPost.id} />
      </motion.div>
    </motion.div >
  )
}

export default Preview;