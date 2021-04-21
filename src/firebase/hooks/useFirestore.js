import { useState, useEffect } from 'react';
import { galleryAuth, galleryFirestore } from '../index'

const useFirestore = (isProfile) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let collectionRef = galleryFirestore.collection('images');
    if (isProfile) {
      collectionRef = collectionRef.where('user', '==', galleryAuth.currentUser.uid);
    }
    const unsub = collectionRef
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
  }, [isProfile]);

  return { docs };
}

export default useFirestore;