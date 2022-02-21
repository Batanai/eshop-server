import { User } from "../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const passwordSecret = process.env.PASSWORD_SECRET;
const jwtSecret = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

// create user
export const createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, salt),
      street: req.body.street,
      aparment: req.body.apartment,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    });

    //if (!user) return res.status(404).send("User not found");

    res.status(200).send(user);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

// get users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll().select("-passwordHash");
    res.send(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

// get user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    }).select("-passwordHash");

    if (!user) return res.status(404).send("User does not exist.");

    res.send(user);
  } catch (error) {
    res.status(400).send(err);
  }
};

// user login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) return res.status(404).send("User does not exist.");

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        jwtSecret,
        { expiresIn: "1d" }
      );

      return res.status(200).send({ user: user, token: token });
    } else {
      return res.status(400).send("Username or passowrd is incorrect.");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// user count
export const userCount = async (req, res) => {
  try {
    const userCount = await User.count({
      col: "User.id",
      where: { isAdmin: false },
    });

    if (!userCount) return res.status(500).send({ success: true });

    return res.status(200).send({ userCount: userCount });
  } catch (error) {
    res.status(500).send(error);
  }
};

// delete userCount

// update user details
