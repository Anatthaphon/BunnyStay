require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อ MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("✅ Connected to MongoDB"));

// โมเดลสำหรับการจองห้องพัก
const BookingSchema = new mongoose.Schema({
  room: String,
  name: String,
  checkInDate: Date,
  checkOutDate: Date,
});
const Booking = mongoose.model("Booking", BookingSchema);

// API จองห้องพัก
app.post("/book", async (req, res) => {
  const { room, name, checkInDate, checkOutDate } = req.body;
  const newBooking = new Booking({ room, name, checkInDate, checkOutDate });
  await newBooking.save();
  res.json({ message: "✅ จองสำเร็จ!" });
});

// เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/rooms", (req, res) => {
    const rooms = [
      { _id: "1", name: "Deluxe Room", description: "ห้องสุดหรู วิวทะเล", price: 2000 },
      { _id: "2", name: "Superior Room", description: "ห้องกว้างขวาง เหมาะสำหรับครอบครัว", price: 1500 },
      { _id: "3", name: "Standard Room", description: "ห้องพักมาตรฐาน ราคาประหยัด", price: 1000 },
    ];
    res.json(rooms);
  });
  
