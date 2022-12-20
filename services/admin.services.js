const ADMIN = require("../models/Admin");
const argon2 = require("argon2");
const { ACCESS_TOKEN_SECRET } = require("../models/index");
const jwtService = require("./jwt.service");
const Speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const { use } = require("../routes/aiRoute");
const cloudinary = require("cloudinary");
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
    const hashedPassword = await argon2.hash(body.password);
    const { username, password } = body;
    const newUser = new ADMIN({
      username,
      password: hashedPassword,
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
    if (!admin)
      return {
        message: "Invalid account!",
        success: false,
      };
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
    const user = await ADMIN.findById(body);
    if (!user) {
      return {
        message: "Login Fail!",
        success: false,
      };
    }
    return {
      message: "Login Successfully!",
      success: true,
      data: { admin: user },
    };
  } catch (error) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
const sendOTP = (email) => {
  var secret = Speakeasy.generateSecret({ length: 20 }).base32;

  let transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "duygtran1706@gmail.com",
      pass: "humtghokhhanbqjn",
    },
  });
  console.log(secret);
  var mailOptions = {
    from: "duygtran1706@gmail.com",
    to: email,
    subject: "Email confirmation",
    html: ` Click <a href=http://localhost:3000/registerSeller/${secret}>here</a> to verify account 
    Your token: ${Speakeasy.totp({
      secret: secret,
      encoding: "base32",
      step: 100,
      window: 3,
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
const verifyUser = async (id, token, _id) => {
  try {
    const isValid = Speakeasy.totp.verify({
      secret: id,
      encoding: "base32",
      token: token,
      window: 3,
      step: 100,
    });
    if (!isValid)
      return {
        message: "The token is not valid!",
        success: false,
      };
    const updateUser = await ADMIN.findByIdAndUpdate(
      { _id: _id },
      { isActive: true }
    );

    if (updateUser) {
      const data = await ADMIN.findById({_id:_id})
      return {
        message: "Verify user successfullyy",
        success: true,
        data: { admin: data },
      };
    }
  } catch (error) {
    return {
      message: "An occured error!",
      success: false,
    };
  }
};
const updateProfile = async (id, body) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(body.avatar, {
      folder: "avatars",
      width: 320,
      height: 320,
      crop: "scale",
    });

    body.avt = {
      url: myCloud.secure_url,
      public_id: myCloud.public_id,
    };
    console.log(body, "body");
    const existUser = await ADMIN.findById({ _id: id });
    if (!existUser)
      return {
        message: "User không tồn tại!",
        success: false,
      };

    const update = await ADMIN.findByIdAndUpdate({ _id: id }, body);
    if (update)
    return {
      data: { admin: update },
      message: "Cập nhật thông tin thành công",
      success: true,
    };
  } catch (error) {
    return {
      message: "Có lỗi xảy ra",
      success: false,
    };
  }
};
module.exports = {
  register,
  updateProfile,
  login,
  getAuth,
  sendMail,
  verifyUser,
};
