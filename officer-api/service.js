const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const database = require("./services/database");
require('dotenv').config()

const userRouter = require('./routes/user.routes.js')

const app = express();

app.use(cors())
database.dbConnect()
app.use(bodyParser.json())
app.use('/api',[userRouter])

const port = process.env.PORT || 5001

app.listen(port, ()=>{console.log(`Server is running on port ${port}`)});