import User from "../models/userModel";

const register = async (req, res) => {
  try {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = await newUser.crypto(req.body.password);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    const verify = await user.veriPass(password, user.password);

    if (!verify) {
      const error = new Error("Invalid Password");
      throw error;
    }

    res.json("vous etes connecté");
  } catch (error) {
    console.error(error.message);
    res.send(error.message);
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

export { register, login, GetAllUsers};
