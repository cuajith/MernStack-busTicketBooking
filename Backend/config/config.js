const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.62w7s.mongodb.net/${process.env.DATABASE_NAME}`
      )
      .then(() => console.log("Database Connected"));
  } catch (error) {
    console.log("Error: Database Connection Failed");
  }
};

module.exports = connectDb;
