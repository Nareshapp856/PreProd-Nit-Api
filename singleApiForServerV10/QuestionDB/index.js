const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/admin', require('./api/admin'));

app.listen(process.env.PORT, () => {
    console.log(`Server started running on ${process.env.PORT} for ${process.env.NODE_ENV}`);
});
