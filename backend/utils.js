import  Jwt  from "jsonwebtoken";

export const generatetoken =  (user) => {
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

  export const isAuth = (req,res,next) =>{
    const authorization = req.headers.authorization

    if(authorization){
      const token =authorization.split(" ")[1];
      Jwt.verify(
        token, 
        process.env.JWT_SECRET,
        (err,decode)=>{
          if(err){
            console.log(err);
            res.status(401).json({message:"Invalid Token"})
          }
          else{
            req.user = decode
            next();
          }
        }
      )
    }
    else{
      res.status(404).json({message:"Token Not Found"})
    }
  }
  

  