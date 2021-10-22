const express = require('express')
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require('cors')

const app = express()

const process = require('process')

var corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json()) /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true }),
) /* bodyParser.urlencoded() is deprecated */

const db = require('./app/models')
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

// simple route
app.get('/', (req, res) => {
  res.json({
    message: 'Try again!',
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    pid: process.pid,
  })
})

require('./app/routes/turorial.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
