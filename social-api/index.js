const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const { userRouter } = require("./routes/user.js");
app.use("/users", userRouter);

app.listen(8800, () => {
    console.log("Social API running at 8800...");
});
