import mongoose from 'mongoose'

// * connection through env

const dbConnect = (url)=>{
    return mongoose.connect(url,console.log('connected to db'));
}

export default dbConnect;