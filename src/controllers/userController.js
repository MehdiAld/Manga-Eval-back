import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";



// const register = async (req, res) => {
//   try {
//     const newUser = new User();
//     newUser.username = req.body.username;
//     newUser.email = req.body.email;
//     newUser.password = await newUser.crypto(req.body.password);
//     await newUser.save();

//     res.json({ message: "Utilisateur créé", newUser });
//   } catch (error) {
    
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ error: error.message });
//     }
   
//     res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
//   }
// };

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Nom d'utilisateur déjà pris." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email déjà associé à un autre compte." });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = await newUser.crypto(password);
    await newUser.save();

    res.json({ message: "Utilisateur créé", newUser });
  } catch (error) {
    res.status(500).send(error.message);
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
        process.env.JWT_SECRET,
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
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const GetUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const UpdatePhotoProfil = async (req, res) => {
  const { userId } = req.params;
  const { profilePicture, banner } = req.body;

  try {
    const updateData = {};
    if (profilePicture) updateData.profilePicture = profilePicture;
    if (banner) updateData.banner = banner;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json(user); // Assure-toi que l'objet utilisateur retourné contient les nouvelles images
  } catch (err) {
    res.status(500).send('Erreur lors de la mise à jour du profil.');
  }
}


const UpdateBanner = async (req, res) => {
  const { userId } = req.params;
  const { banner } = req.body; // On ne s'intéresse qu'à la bannière ici

  try {
    const updateData = {};
    if (banner) updateData.banner = banner;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé.');
    }
    res.json(user); // Retourne l'utilisateur mis à jour
  } catch (err) {
    res.status(500).send('Erreur lors de la mise à jour de la bannière.');
  }
}

export { register, login, GetAllUsers, deleteUser, updateUser, GetUserById, UpdatePhotoProfil, UpdateBanner };


