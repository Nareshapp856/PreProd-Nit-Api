const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/api/admin', require('./api/admin'));

app.get("/",async(req,res)=>{
    res.send({message:"hello world"});
})

const port= process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server started running on http://localhost:3000');
});
