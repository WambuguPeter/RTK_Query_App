import { Router } from 'express';
const uploadImageRouter = Router();
import multer from 'multer';
const uploadToUser = multer({ dest: './src/photos/users' });
const uploadToMemory = multer({ dest: './src/photos/memories' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/photos/users');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});



uploadImageRouter.post('/upload-user-profile',uploadImageRouter.single('userImage'), (req, res) => {
    req.file;
    req.body;
    // upload images using multer

    res.send('Image uploaded');
});

uploadImageRouter.delete('/delete-user-profile', (req, res) => {
    res.send('Image deleted');
});

uploadImageRouter.post('/upload-memory-img', (req, res) => {
    res.send('Image updated');
});
uploadImageRouter.post('/upload-many-memory-img',uploadToMemory.array('manyMemories',10), (req, res) => {
    res.files.forEach(file => {
        console.log(file);
    });
    req.body.forEach(file => {
        console.log(file);
    });
    res.send('Image updated');
});


export default uploadImageRouter;
