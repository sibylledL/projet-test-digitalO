import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
//import config from 'config';
import bodyParser from 'body-parser';
import cors from "cors"//pb header

import { Img } from './model/images';

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true,}))

const port = 4567;
const dbUrl = "mongodb://localhost/imageTest_db";

mongoose.connect(dbUrl)

let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error;'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(express.static('public'));
app.use(bodyParser.json({type:'application/json'}));
//
//
//
//
//page d'accueil
const imgRouter = express.Router();
app.use('/', imgRouter)

imgRouter.get('/addimage',(req, res) => {
  res.json({"admin":"working"})
})

//upload fichier
const storage = multer.diskStorage({
destination: ( req, file, cb) => {
    cb(null, './public/uploads/')
},
filename: (req, file, cb) => {
  cb(null, file.originalname)
}
});

const upload = multer({storage: storage})
//const upload = multer({dest:'public/uploads/'});
imgRouter.post('/addimage', upload.single('img'),(req,res) => {
  let newImg = new Img(req.body)
  if(req.file){
     newImg.img = req.file.originalname
  }else{
    newImg.img = "noimage.png"
  }
  newImg.save((err,img) => {
    if(err) res.send(err)
    res.json(img)
  });
});

app.get('/img',(req,res) => {
  res.json({"message":"coucou"})
});

///page de visionnage des image
imgRouter.get('/showimage',(req, res) => {
  Img.find({},(err, imgs) => {
    if(err) throw err
    res.json(imgs)
  });
});


app.listen(port);
console.log(`magic happens on ${port}`);
