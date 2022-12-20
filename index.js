const route = require("./routes/index");
const { MONGO_URL } = require("./models/index");
const express = require("express");
const mongoose = require("mongoose");
const { PORT } = require("./models/index");
const app = express();
const cloudinary = require("cloudinary")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    });

    console.log("Connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
cloudinary.config({
  cloud_name: "dzljztsyy",
  api_key: "633463535256664",
  api_secret: "EyWtZfg-x67rjQx438ImVwc82PY",
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json());
app.use(route);
connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
