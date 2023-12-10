import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prismaClient.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    let message = "";
    const { username, email, password } = req?.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      message = "user with the same email exist please try differnet email";
      res.status(201).json({ success: false, message });
    } else {
      const Createuser = await prisma.user.create({
        data: { name: username, email: email, password: hashedPassword },
      });

      const TokenData = {
        id: Createuser.id,
        name: Createuser.name,
        email: Createuser.email,
      };

      const token = jwt.sign(
        TokenData,
        process.env.My_SECRET || "efwfwfwt5t65464yregweffwr45wfwefwef",
        {
          expiresIn: "1h",
        }
      );

      message = "user sign up succesfuly";

      res
        .status(201)
        .cookie("access_token", token, { httpOnly: true })
        .json({ success: true, message })
        .redirect("/");

      if (!Createuser) {
        message = "failed to register new user";
        return res.status(400).json({ success: false, message });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const signin = async (req, res) => {
  let message = "";
  const { email, password } = req?.body;
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist) {
    const passwordsMatch = await bcrypt.compare(password, userExist?.password);
    const TokenData = {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
    };
    if (passwordsMatch) {
      const token = jwt.sign(
        TokenData,
        process.env.My_SECRET || "efwfwfwt5t65464yregweffwr45wfwefwef",
        {
          expiresIn: "30d",
        }
      );
      message = "User Signed In Succesfuly";
      res.cookie("access_token", token, { httpOnly: true });
      res.status(201).json({ success: true, message, user: TokenData });
    } else {
      message = "Password incorrect";
      res.status(401).json({ success: false, message });
    }
  } else {
    message = "User doesn't exist";
    res.status(401).json({ success: false, message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "Logout Succesfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
