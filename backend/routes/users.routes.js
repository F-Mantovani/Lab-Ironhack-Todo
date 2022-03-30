// const { Router } = require("express");
// const uploadCloud = require("../config/cloudinary.config");

// const User = require("../models/User")

// const router = Router();

// router.post("/:id/uploadImage", uploadCloud.single("image"), async (req, res) => {
//     const { path } = req.file;
//     const { id } = req.params;
//     try {
//       const updatedUser = await User.findByIdAndUpdate(id, { image: path }, { new: true }).select('-passwordHash');
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   }
// );

// module.exports = router;
