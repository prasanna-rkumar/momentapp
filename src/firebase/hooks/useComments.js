import { useState, useEffect } from 'react';
import { galleryFirestore } from '../index'

const useComments = (postId) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = galleryFirestore.collection('images')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach(doc => {
          let data = doc.data();
          documents.push({ ...data, id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [postId]);

  return { comments: docs };
}

export default useComments;