const app = require('./App');
const config = require('./utilis/config');
const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Db connection established.');
  } catch (error) {
    console.log('DB Error: ', error);
  }
};

//Connecting DB
db();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
