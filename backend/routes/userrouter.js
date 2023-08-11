import express from 'express';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generatetoken from '../utils.js';
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
export default router;
