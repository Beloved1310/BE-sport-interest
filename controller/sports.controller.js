const Sport = require("../model/sport");
const cloudinary = require("../utilis/cloudinary");

module.exports = {
  async createSport(req, res) {
    const { name } = req.body;
    const { secure_url: image, public_id: cloudinary_id } =
      await cloudinary.uploader.upload(req.file.path);
    await Sport.create({
      image,
      cloudinary_id,
      name,
    });

    const data = {
      image,
      cloudinary_id,
      name,
    };
    return res.send({ message: "Created Sport", data });
  },

  async getSports(req, res) {
    const data = await Sport.find();
    return res.send({ message: "Sports", data });
  },
};
