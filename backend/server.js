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

// แก้ไขข้อมูลการจอง
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking); // ส่งข้อมูลการจองที่ถูกอัปเดตกลับ
  } catch (error) {
    res.status(500).json({ error: "Error updating booking" });
  }
});

// ลบข้อมูลการจอง
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting booking" });
  }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(5000, () => console.log("Server running on port 5000"));

