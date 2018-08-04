const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const SongController = require('./controllers/SongController');
const BookmarksController = require('./controllers/BookmarksController')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage:  storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
    });

module.exports = (app) =>{
    app.post('/register',AuthenticationControllerPolicy.register, AuthenticationController.register);
    app.post('/login', AuthenticationController.login);
    app.get('/songs', SongController.index);
    app.post('/songs',upload.single('albumImage'), SongController.post);
    app.get('/songs/:songId', SongController.show)
    app.put('/songs/:songId', upload.single('albumImage'), SongController.put);
    app.get('/bookmarks', BookmarksController.index)
    app.post('/bookmarks', BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId', BookmarksController.delete)
    app.get('/bookmarks/all', BookmarksController.index1)

}

