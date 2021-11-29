const User = require("../models/user");
exports.createorupdateuser = async (req, res) => {
  const { name, email, picture } = req.user;
  // const user = await User.findOneAndUpdate({find by email },{updte name & picture},{return updated })
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
  }
};

exports.currentuser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
