import jwt from 'jsonwebtoken'

const authDoctor = async (req,res,next) =>{
    try {
        const {dtoken} = req.headers

        if(!dtoken){
            return res.status(400).json({ success: false, message: "Not Authorized Login again" });
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId = token_decode.id
  
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
}

export default authDoctor;