require('dotenv').config();
const { ref, uploadBytes, getDownloadURL  , getStorage} = require('firebase/storage');
const { app } = require('../configs/firebase.config');

const storage = getStorage(app, 'gs://' + process.env.STORAGE_BUCKET);

async function uploadFile(file) {
  let storageRef = ref(storage , `images/${file.originalname}`);
  let metadata = {
    contentType: file.mimetype,
  };
  let uploadedFile = await uploadBytes(storageRef, file.buffer, metadata);
  let url = getDownloadURL(uploadedFile.ref);
  return url;
}


async function deleteFile(file){

}
module.exports = uploadFile;
