var fs = require('fs');
var imgur = require('imgur');
var multer = require('multer');
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
var router = require('express').Router();
//router allows you to inject middleware into the requests so it allows you to check for example valid api keys before you send a response back

var upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 200 * 1000 * 1000
  },
  fileFilter: function (req, file, cb) {
    cb(null, file.mimetype.slice(0,6) === 'image/');
  }
});

router.get('/', function (req, res) {
  res.render('templates/imgur');
});

router.post('/upload', upload.single('image'), function (req, res) {
  console.log(req.file);

  if (req.file) {
    imgur
      .uploadFile(req.file.path)
      .then(function (json) {
        fs.unlink(req.file.path, function () {
          res.redirect(json.data.link);
        });
      })
      .catch(function (err) {
        res.send(err);
      });
  } else {
    res.status(415).send('Must upload an image!');
  }
});

module.exports = router;
