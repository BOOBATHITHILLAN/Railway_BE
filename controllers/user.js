const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Train = require('../model/train');
const config = require('../utilis/config');
require('dotenv').config();

const userController = {
  signup: async (request, response) => {
    try {
      const { username, email, password } = request.body;
      const chkuser = await User.findOne({ email });
      if (chkuser) {
        return response.status(404).json({ error: 'mail id already exists' });
      }
      const hashedpassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedpassword,
        profilename: 'default.png',
      });
      await newUser.save();

      response.status(200).json({ message: 'User added successfully' });
    } catch (error) {
      console.log('Error in signup', error);
      response.status(404).json({ error: 'Error in sigup' });
    }
  },
  signin: async (request, response) => {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(404).json({ error: "email doesn't exists" });
      }
      const chkpassword = await bcrypt.compare(password, user.password);
      if (!chkpassword) {
        return response.status(404).json({ error: 'invalid password' });
      }
      const payload = {
        username: user.username,
        userId: user._id,
        mail: user.email,
      };
      const token = jwt.sign(payload, process.env.SECRET_CODE);

      response.send({ token: token, id: user._id, username: user.username });
    } catch (error) {
      response.json({ message: 'Error in signin' });
      console.log('Error in signin ', error);
    }
  },
  list: async (request, response) => {
    try {
      const user = await User.find({}, {});
      response.send(user);
    } catch (error) {
      response.status(404).json({ error: 'Error in getting list ' });
      console.log('Error in getting list :', error);
    }
  },
  forgot: async (request, response) => {
    try {
      const { email } = request.body;
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(404).json({ error: 'Invalid mail id' });
      }
      const randomstring = Math.random().toString(20).substring(4, 15);
      const link = `${process.env.FE_LINK}/resetpassword/${user.id}`;
      user.resetToken = randomstring;
      user.passwordActivated = true;
      await user.save();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL,
          pass: config.PASSWORD,
        },
      });
      async function sendmail() {
        const info = await transporter.sendMail({
          from: `"Boobathi Thillan" <${config.EMAIL}>`,
          to: user.email,
          subject: 'Reset Password',
          text: link,
        });
        console.log('message send:%s', info.messageId);
      }
      sendmail().catch(console.error);
      response.json({ error: 'mail sended successfully' });
    } catch (error) {
      response.json({ message: 'Error in forgot page' });
      console.log('Error in forgot page :', error);
    }
  },
  reset: async (request, response) => {
    try {
      const { password, id } = request.body;

      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        return response
          .status(404)
          .json({ error: 'Error in reset, pls try again' });
      }
      if (user.passwordActivated == true && user.resetToken !== '') {
        const hashedpassword = await bcrypt.hash(password, 10);
        user.password = hashedpassword;
        user.passwordActivated = false;
        user.resetToken = '';
        await user.save();

        response.json({ message: 'password updated successfully' });
      } else {
        response.status(404).json({ error: 'this link is invalid' });
      }
    } catch (error) {
      response.status(404).json({ error: 'Error in reset password' });
      console.log('Error in reset password');
    }
  },
};

module.exports = userController;
