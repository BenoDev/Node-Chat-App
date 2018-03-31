const path = require('path'); //standard node module
const express = require('express');

const publicPath = path.join(__dirname,'..','/public');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicPath));


app.listen(PORT, ()=> {
  console.log(`Server is up on port ${PORT}!`);
});