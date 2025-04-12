const express = require('express');
const router = express.Router();


// Route GET pour /api/hello
router.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello to the Cesizen\'s API!' });
  });




module.exports = router;
