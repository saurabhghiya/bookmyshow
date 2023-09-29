const mongoose = require('mongoose');

const db = `mongodb+srv://saurabhghiya:naAqmmEn2MT7zjna@cluster-sg-app.qmvohsh.mongodb.net/?retryWrites=true&w=majority`

/* 
incase of errors while connecting replace the connect method with following
mongoose.connect(db,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
*/
// process.env gives access to all .env files and variabls inside. 
// mongo_url is variable inside .env files
// dotenv package needs to be installed to use this feature

mongoose.connect(process.env.mongo_url).then(()=>{
    console.log('Connection Established');
}).catch((error)=>{
    console.log(error);
})
