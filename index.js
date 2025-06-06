const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();

//const HOST = '192.168.170.227';
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const brandRouter = require("./routes/brandRoute");
const uploadRouter = require("./routes/uploadRoute");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);




app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});