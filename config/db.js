const mongoose = require('mongoose');

const connectDB  =  async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mogoose Connected');
    } catch (err) {
        console.error('Mongoose connection Error - ',err.message);
        process.exit(1);
        
    }

};
module.exports = connectDB;