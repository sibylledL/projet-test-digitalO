import mongoose from 'mongoose';
const Schema = mongoose.Schema

const imgSchema = new Schema({
  titre:String,
  year:Number,
  img:String
})


const Img = mongoose.model('Img', imgSchema)
export { Img }
