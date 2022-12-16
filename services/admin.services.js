const ADMIN = require("../models/Admin");
const argon2 = require("argon2");
const { ACCESS_TOKEN_SECRET } = require("../models/index");
const jwtService = require("./jwt.service");
const Speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const register = async (body) => {
  try {
    const existUser = await ADMIN.findOne({
      username: body.username,
    });
    if (existUser) {
      return {
        message: "User already ",
        success: false,
      };
    }
    const existEmail = await ADMIN.findOne({
      email: body.email,
    });
    if (existEmail) {
      return {
        message: "Email has been used!",
        success: false,
      };
    }
    const hashedPassword = await argon2.hash(body.password);
    const { username, password, name, email, address, phone, role } = body;
    const newUser = new ADMIN({
      username,
      password: hashedPassword,
      name,
      email,
      address,
      phone,
      role,
    });
    await newUser.save();
    return {
      message: "Create Seller successfully!",
      success: true,
    };
  } catch (error) {
    return {
      message: "An error occurred!",
      success: false,
    };
  }
};
const login = async (body) => {
  try {
    const { username, password } = body;
    const admin = await ADMIN.findOne({
      username: username,
    });
    console.log(body);
    if (!admin)
      return {
        message: "Invalid account!",
        success: false,
      };
    if (!admin.isActive) {
      return {
        message: "Please verify the account!",
        success: false,
      };
    }
    const PasswordValid = await argon2.verify(admin.password, password);
    if (!PasswordValid) {
      return {
        message: "Invalid password!",
        success: false,
      };
    }
    const token = jwtService.createToken(admin._id);
    return {
      message: "Login Successfully!",
      success: true,
      data: { token: token, admin: admin },
    };
  } catch (err) {
    return {
      message: "An error occurred!",
      success: false,
    };
  }
};
const getAuth = async (body) => {
  try {
    const user = await USER.findById(body);
    if (!user) {
      return {
        message: "Login Fail!",
        success: false,
      };
    }
    return {
      message: "Login Successfully!",
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
const sendOTP = (email) => {

  var secret = Speakeasy.generateSecret({ length: 20 });
     
   
  let transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "duygtran1706@gmail.com",
      pass: "humtghokhhanbqjn",
    },
  });
  console.log(secret.base32);
  var mailOptions = {
    from: "duygtran1706@gmail.com",
    to: email,
    subject: "Email confirmation",
    html: ` Click <a href=http://localhost:4000/auth/verify/seller/${secret.base32}>here</a> to verify account 
    Your token: ${Speakeasy.totp({
      secret: secret.base32,
      encoding: "base32"
    })}`,
  };
  transport.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log("aaaaaaa");
    } else {
      console.log("Message sent");
    }
  });
};
const sendMail = async (body) => {
  try {
    const User = await ADMIN.findOne({ email: body.email });

    if (!User)
      return {
        message: "Invalid email!",
        success: false,
      };
  
    sendOTP(body.email);
    return {
      message: "Send Email successfully!",
      success: true,
    };
  } catch (error) {
    return {
      message: "An occured error!",
      success: false,
    };
  }
};
const verifyUser = async (id, token) => {
  try {
    const isValid = Speakeasy.totp.verify({
      secret: id,
      encoding: "base32",
      token: token,
      window: 0,
    });
    if (!isValid)
      return {
        message: "The token is not valid!",
        success: false,
      };
    return {
      message: "Verify user successfullyy",
      success: true,
    };
  } catch (error) {
    return {
      message: "An occured error!",
      success: false,
    };
  }
};
module.exports = {
  register,
  login,
  getAuth,
  sendMail,
  verifyUser,
};
