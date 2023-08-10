import  Jwt  from "jsonwebtoken";

const generatetoken =  (user) => {
    return Jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );
  };
  
  export default generatetoken;
  