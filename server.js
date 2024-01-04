import path from "path";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import { UserRoutes } from "./routes/index.js";
import { connectDB, passport as passConfig } from "./config/index.js";

const app = express();
app.use(express.json());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
passConfig(passport);

// Routes
app.use("/api/users", UserRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
connectDB();
app.listen(port, () => console.log(`Server up and running on port ${port}`));
