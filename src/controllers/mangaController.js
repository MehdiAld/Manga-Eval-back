import Manga from "../models/mangaModel";
import Critics from "../models/criticModel";

const getAllManga = async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.json(mangas);
  } catch (error) {
    res.send(error);
  }
};

const createManga = async (req, res) => {
  const {
    title,
    critic,
    category,
    image,
    imagesection,
    imagebackground,
    created_at,
    date,
  } = req.body;
  try {
    const manga = new Manga({
      title,
      critic,
      category,
      image,
      imagesection,
      imagebackground,
      created_at,
      date,
    });

    const savedManga = await manga.save();
    console.log("Manga enreigistré🎇", savedManga);
    res.json(savedManga);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const addCriticToManga = async (req, res) => {
  const { mangaId, criticId } = req.params;

  try {
    const manga = await Manga.findById(mangaId);
    const critic = await Critics.findById(criticId);

    if (!manga || !critic) {
      res.json({ message: "Manga ou critique non trouvée." });
      return;
    }

    if (
      !manga.critic.some(
        (existingcritic) => existingcritic._id.toString() === criticId
      )
    ) {
      const criticDetails = {
        title: critic.title,
        comment: critic.comment,
        created_at: critic.created_at,
        notary: critic.notary,
      };

      manga.critic.push(criticDetails);
      await manga.save();
      res.json(manga);
    } else {
      res.json({ message: "La critique est déjà dans la publier." });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateManga = async (req, res) => {
  try {
    const manga = await Manga.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json({ manga, message: "BRAVO !!!! tu as mis à jour le manga" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteManga = async (req, res) => {
  const mangaId = req.params.mangaId;

  try {
    const deletedManga = await Manga.findByIdAndDelete(mangaId);

    if (deletedManga) {
      res.json({
        message: "le manga ci-dessous à bien été supprimée",
        manga: deletedManga,
      });
    } else {
      res.json({ message: "Manga non trouvée" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const removeCriticFromManga = async (req, res) => {
  const { mangaId, criticId } = req.params;

  try {
    const manga = await Manga.findById(mangaId);

    if (!manga) {
      return res.json({ message: "Manga non trouvé." });
    }

    const mangaIndex = manga.critic.findIndex(
      (critic) => critic._id.toString() === criticId
    );

    if (mangaIndex !== -1) {
     
      manga.critic.splice(mangaIndex, 1);
      await manga.save();
      res.json({
        message: "Critique retirée du manga avec succès.",
        manga,
      });
    } else {
      res.json({ message: "Critique non trouvée dans le manga." });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const showMeOneManga = async (req, res) => {
  try {
    const showMe = await Manga.findById(req.params.id);
    res.json([showMe]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export {
  getAllManga,
  createManga,
  addCriticToManga,
  updateManga,
  deleteManga,
  removeCriticFromManga,
  showMeOneManga,
};
