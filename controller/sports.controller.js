const Sport = require('../../Model/Sports');
const cloudinary = require('../../utilis/cloudinary');
const uploadSportValidation = require('../../validation/uploadSportValidation');

module.exports = async (req, res) => {
  const { value, error } = uploadSportValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  const { name, price, quantity } = value;

  const { secure_url: image, public_id: cloudinary_id } =
    await cloudinary.uploader.upload(req.file.path);
  await Sport.create({
    image,
    cloudinary_id,
    name,
    price,
    quantity,
    user: req.user._id,
  });

  const data = {
    image,
    cloudinary_id,
    name,
    price,
    quantity,
  };
  return res.send({ message: 'Created Sport', data });
};