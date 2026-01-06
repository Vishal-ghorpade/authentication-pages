const mongoose =require('mongoose');


//Be3e87pLcx2ifsZt
const mongo_url=process.env.MONGO_CONN;
mongoose.connect(mongo_url)
.then(()=>{
    console.log('mongodb connected...');

}).catch((err)=>{
    console.log('mongodb connection error:',err);

})

