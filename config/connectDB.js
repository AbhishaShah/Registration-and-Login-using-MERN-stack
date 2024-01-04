import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * @param {string} dbURL Database connection url
 */
export const connectDB = async (dbURL) => {
  try {
    await connect(process.env.MONGODB_URI || dbURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB successfully connected");
  } catch (err) {
    console.log("Fail to connect DB");
    console.log(err);
  }
};
