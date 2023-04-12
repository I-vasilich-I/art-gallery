import { initializeApp } from 'firebase/app';
import { 
  StorageReference, 
  UploadResult, 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytes, 
  deleteObject,
} from 'firebase/storage';
import { type File } from '@koa/multer';
import config from 'config';

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);

const upload = (fileName: string, file: File): Promise<UploadResult> => {
  const metadata = {
    contentType: file.mimetype,
  };
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytes(storageRef, file.buffer, metadata);
  
  return uploadTask;
};

const getRef = (fileName: string) => ref(storage, fileName);

const getArtUrl = (storageRef: StorageReference) => getDownloadURL(storageRef);

const deleteArt = (path: string) => {
  const artRef = getRef(path);
  return deleteObject(artRef);
};

export default {
  upload,
  getArtUrl,
  deleteArt,
};
