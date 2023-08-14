import express from 'express';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { generatetoken, isAuth } from '../utils.js';
import User from '../model/user.js';
const router = express.Router();

router.post(
  '/signin',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generatetoken(user),
        });
      }
    }
    return res
      .status(401)
      .json({ message: 'Please! Enter Valid Email or Password' });
  })
);


router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.name),
    });
    user.save();
    if (user) {
      return res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generatetoken(user),
      });
    }
  })
);

router.put(
  '/profile',
  isAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
  
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updateUser = await user.save();
        return res.send({
          _id: updateUser._id,
          name: updateUser.name,
          email: updateUser.email,
          isAdmin: updateUser.isAdmin,
          token: generatetoken(updateUser),
        });
      }
      else{ 
        res.status(404).send({ message: 'User Not Found' });
      }
    } catch (error) {
      console.log(error);
    }
   
  })
);

export default router;
