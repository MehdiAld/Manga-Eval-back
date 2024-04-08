import Critics from "../models/criticModel";
import Manga from "../models/mangaModel";

const getAllCritics = async (req, res) => {
  try {
    const critic = await Critics.find();
    res.json(critic);
  } catch (error) {
    res.send(error);
  }
};

const createCriticsForManga = async (req, res) => {
  const { title } = req.body;
  const { comment } = req.body;
  try {
    const critic = new Critics({
      title,
      comment,
    });
    await critic.save();
    res.json({
      title,
      critic,
      message: "Tu as créé ta critique✍",
    });
  } catch (error) {
    res.json({ error: error.message });
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

    // Trouver le manga par son ID
    const manga = await Manga.findById(mangaId);

    if (!manga) {
      return res.status(404).json({ message: "Manga non trouvé." });
    }

    // Ajouter une critique au manga
    manga.critic.push({ title, comment });

    // Sauvegarder les modifications dans la base de données
    await manga.save();

    res.status(201).json({
      message: "Critique créée avec succès dans le manga.",
      manga,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllCritics,
  createCriticsForManga,
  updateCritic,
  deleteCritic,
  showMeOneCritics,
  createCriticInManga,
};
