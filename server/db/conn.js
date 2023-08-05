const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose.connect(DB, 
  {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);


const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));
db.once("open",function(){
    console.log("connected successfully");
});