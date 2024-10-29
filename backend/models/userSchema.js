const mongoose=require("mongoose")
const roleEnum = {
    ADMIN: 'Admin',
    USER: 'User',
    PROFILE_BUILDER: 'ProfileBuilder',
  };
  const emailRegex = /^20[0-9]{7}@diu\.iiitvadodara\.ac\.in$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
function validateEmail(value)
{ 
    return emailRegex.test(value);
}
function ValidatePassword(value)
{
    return passwordRegex.test(value);
}
const userSchema=mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    RollNo:{
        type: Number,
        required:true,
        unique:true,
    },
    Role: {
        type: String,
        enum: Object.values(roleEnum),
        required:true,
      },
    ID_Scan_Code:{
        type: Number,
        required:true,
        unique:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: validateEmail,  // Custom validator function
            message: props => `${props.value} is not a valid Email!`,  // Error message
          },
    Password:{
        type: String,
        required:true,
        // validate:{
        //     validator: ValidatePassword,
        //     message:(props)=>{
        //         console.log(props.message,"Validation of password is incorrect");
        //     }
        // }
    },
    }
})

const userModel=mongoose.model('userModel',userSchema);
module.exports= {userModel};