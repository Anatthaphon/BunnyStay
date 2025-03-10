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
const bookingSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  checkIn: String,
  checkOut: String,
  guests: Number,
  roomType: String,
  totalPrice: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);

app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).send("Booking saved!");
  } catch (error) {
    res.status(500).send("Error saving booking.");
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find(); // ดึงข้อมูลการจองทั้งหมดจาก MongoDB
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));
