import mongoose from "mongoose";

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/mydb';

try {
  mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (e) {
  console.log(e);
  process.exit(-1);
}

mongoose.connection.on("open", () => {
  console.log("Connected to mongodb");
});
