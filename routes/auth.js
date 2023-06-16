const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { User } = require("../models");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are both required." });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ username, password: hashedPassword });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '6h' });
    console.log(token)
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;