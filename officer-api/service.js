const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config()
require('./helpers/http-error-helper')

const userRouter = require('./routes/user-routes.js')
const assetRouter = require('./routes/asset-routes.js')
const employeeRouter = require('./routes/employee-routes.js')

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use('/api',[userRouter, assetRouter, employeeRouter])

const port = process.env.PORT || 5001

app.listen(port, ()=>{console.log(`Server is running on port ${port}`)});