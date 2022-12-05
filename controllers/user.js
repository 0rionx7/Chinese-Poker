import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const fetchedUser = await User.findOne({ userName });
    if (!fetchedUser)
      return res.status(417).json('Authentication Failed! userName');
    const passValidate = await bcrypt.compare(password, fetchedUser.password);
    if (!passValidate)
      return res.status(417).json('Authentication Failed! password');
    const token = jwt.sign(
      { userName, userId: fetchedUser._id },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token,
      expiresIn: 60,
    });
  } catch (error) {
    res.status(429).json(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      password: hash,
      points: 0,
    });
    res.status(200).json({ userName, uid: user._id });
  } catch (error) {
    res.status(429).json(error.message);
  }
};

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const tokenVerified = jwt.verify(token, process.env.JWT_KEY);
    res.status(200).json({ expires: tokenVerified.exp });
  } catch (error) {
    res.status(429).json(error);
  }
};

const updateScore = (req, res, next) => {
  const { playerName: userName, score: points } = req.body;
  User.findOneAndUpdate({ userName }, { $inc: { points } }).then(
    (response) => {
      return res.status(202).json(response);
    },
    (error) => res.status(429).json(error)
  );
};

const getScore = async (req, res, next) => {
  const { name: userName } = req.query;
  try {
    const user = await User.find({ userName });
    return user[0]
      ? res.status(200).json(user[0].points)
      : res.status(200).json();
  } catch (error) {
    console.log(error);
  }
};

export { login, register, verify, updateScore, getScore };
