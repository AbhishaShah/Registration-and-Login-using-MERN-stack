import { Router } from "express";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import keys from "../../config/keys";
import { validateLoginInput, validateRegisterInput } from "../../validation";
import { User } from "../../models";

// @route POST api/users/register
// @desc Register user
// @access Public
const routes = Router();

routes.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  //Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (isValid) return res.status(400).json(errors);

  const hashPassword = await hash(password, 10);
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ email: "Email already exists" });
    const newUser = new User({
      name,
      password: hashPassword,
      email,
    });
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Form Valdiation
  const { errors, isValid } = validateLoginInput(req.body);
  if (isValid) return res.status(400).json(errors);

  try {
    //Find user by Email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ emailnotfound: "Email not found" });

    // Check password
    const isMatchPassword = await compare(password, user.password);
    if (!isMatchPassword)
      return res.status(400).json({ passwordincorrect: "Password incorrect" });

    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
    };

    // Sign token
    sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) return res.status(500).json(err);

        res.json({
          success: true,
          token: "Bearer " + token,
        });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

export default routes;
