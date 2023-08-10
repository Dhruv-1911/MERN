import express from 'express';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generatetoken from "../utils.js"
import User from '../model/user.js';
const router = express.Router();

router.post(    
  '/signin',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({email:req.body.email})
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
       return res.send({
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generatetoken(user),
        });
      }
    }
   return res.status(404).json({ message: 'Please. Enter Valid Email' });
  })
);

export default router;
