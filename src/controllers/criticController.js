import Critics from "../models/criticModel";
import Manga from "../models/mangaModel";
import User from "../models/userModel";

const getAllCritics = async (req, res) => {
  try {
    
    const generalCritics = await Critics.find();

    
    const mangaCritics = await Manga.aggregate([
     
      { $unwind: "$critic" },
      
      {
        $project: {
          _id: "$critic._id",
          title: "$critic.title",
          comment: "$critic.comment",
          created_at: "$critic.created_at",
          notary: "$critic.notary",
        },
      },
    ]);

  
    const allCritics = [...generalCritics, ...mangaCritics];

    res.json(allCritics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCriticForUser = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { title, comment, mangaId } = req.body; 

   
    const newCritic = new Critics({
      title,
      comment,
      id_manga: mangaId, 
    });

   
    const savedCritic = await newCritic.save();

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    
    user.critics.push(savedCritic._id);

   
    await user.save();

    res.status(201).json({
      message: "Critique créée avec succès pour l'utilisateur.",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getUserCritics = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const userCritics = await Critics.find({ _id: { $in: user.critics } });

    res.json(userCritics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCritic = async (req, res) => {
  try {
    const update = await Critics.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json({ update, message: "BRAVO !!!! tu à mit à jours ta critique" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteCritic = async (req, res) => {
  try {
    const removecritic = await Critics.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "BRAVO !!, la critique est supprimer" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const showMeOneCritics = async (req, res) => {
  try {
    const show = await Critics.findById(req.params.id);
    res.json(show);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createCriticInManga = async (req, res) => {
  try {
    const { mangaId } = req.params;
    const { title, comment } = req.body;

    const manga = await Manga.findById(mangaId);

    if (!manga) {
      return res.status(404).json({ message: "Manga non trouvé." });
    }
    manga.critic.push({ title, comment });
    await manga.save();

    res.status(201).json({
      message: "Critique créée avec succès dans le manga.",
      manga,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCriticsByManga = async (req, res) => {
  try {
    const { mangaId } = req.params;

    
    const manga = await Manga.findById(mangaId);

    if (!manga) {
      return res.status(404).json({ message: "Manga non trouvé." });
    }

    const mangaCritics = await Critics.find({ id_manga: mangaId });

    res.status(200).json({
      message: "Tous les critiques du manga ont été récupérés avec succès.",
      mangaCritics: mangaCritics
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {
  getAllCritics,
  updateCritic,
  deleteCritic,
  showMeOneCritics,
  createCriticInManga,
  createCriticForUser,
  getUserCritics,
  getCriticsByManga,
};
