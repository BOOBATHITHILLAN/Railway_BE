require('dotenv').config();
const MONGO_DB=process.env.MONGO_DB;
const PORT = process.env.PORT;
const SECRET_CODE = process.env.SECRET_CODE;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

module.exports = {
    MONGO_DB,
    PORT,
    SECRET_CODE,
    EMAIL,
    PASSWORD,
}