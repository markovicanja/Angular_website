// call all the required packages
const express = require('express')
const multer = require('multer');
var cors = require('cors');
var fileExtension = require('file-extension')

//CREATE EXPRESS APP
const app = express();

// cors allow usage of server from different origin only for development
app.use(cors())


//ROUTES WILL GO HERE
app.get('/', function (req, res) {
    res.json({ message: 'Server Started!' });
});

app.listen(3000, () => console.log('Server started on port 3000'));