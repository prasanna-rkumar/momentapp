import { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { galleryStorage, galleryFirestore, firebaseTimestamp, galleryAuth as auth } from '../index';

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { togglePreviewModal } = useContext(AppContext);

  const createPostInFirebase = (file, caption) => {
    if (!file) return;
    const storageRef = galleryStorage.ref(file.name + (Date.now().toString()));
    const collectionRef = galleryFirestore.collection('images');

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = firebaseTimestamp();
      await collectionRef.add({ url, createdAt, caption, user: auth.currentUser.uid });
      setUrl(url);
      togglePreviewModal();
    });
  }

  return { progress, url, error, createPostInFirebase };
}

export default useStorage;