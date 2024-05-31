import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

const register = async (req, res) => {
  try {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = await newUser.crypto(req.body.password);
    await newUser.save();

    res.json({ message: "User created", newUser });
  } catch (error) {
    res.send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_secret,
        { expiresIn: "1h" }
      );
      res.json({ token });
      console.log(token);
    } else {
      console.log("Échec de l'authentification. Identifiants invalides.");
      res.status(401).json({ error: "Vos identifiants sont invalides" });
    }
  } catch (error) {
    console.error("Erreur lors de la tentative de connexion:", error);
    res.status(500).json({ error: "Hello from the other side" });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    console.log(
      "Tentative de suppression de l'utilisateur avec l'ID :",
      userId
    );

    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("Utilisateur supprimé :", deletedUser);
    if (!deletedUser) {
      console.log("Utilisateur non trouvé.");
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Utilisateur supprimé avec succès.");
    res.json({ message: "User deleted", deletedUser });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login, GetAllUsers, deleteUser, updateUser };
