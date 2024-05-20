const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userroutes");
const messageRoute = require("./routes/messagesRoute");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

const corsOptions = {
  origin: "https://chattyapp-7e4c.onrender.com", // Replace with your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // if you need to send cookies or auth headers
};

const path = require("path");

const morgan = require("morgan");

// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URL, {
    // useNewParser:true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(__dirname, "client"), "dist")));
  app.use("*", (req, res) => {
    res.sendFile(path.join(path.resolve(__dirname, "client"), "dist"));
  });
}

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
    Credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
