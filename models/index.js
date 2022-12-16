require('dotenv').config()
const configEnv = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  JWT_KEY: process.env.JWT_KEY,
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASS
}


module.exports = configEnv