const express = require("express");
const app = express();
const port = 5100;
const dbConnect = require('./db')
dbConnect()
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("successful")
})

app.use('/api/auth', require('./routes/Auth'))
app.use('/api/code', require('./routes/Code'))

app.listen(port, () => {
    console.log(`api is listening on port ${port}`);
})
