const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
// const { app: userauth } = require('./FacultyCurriculumNodeApi/userauth');
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/api/admin', require('./Questiondb/api/admin'));
// app.use("/",userauth);

app.get("/",(req,res)=>{
  res.send({message:"hello world"});
})

app.listen(process.env.PORT, () => {
    console.log(`Server started running on ${process.env.PORT} for ${process.env.NODE_ENV}`);
});
