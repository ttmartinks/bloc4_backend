const express = require('express');
const router = express.Router();


// Route GET pour /api/hello
router.get('/hello', (req, res) => {
    res.status(200).json({ message: 'Hello to the Cesizen\'s API!' });
  });

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Animi abutor pectus voluptatem tametsi. Votum appono venustas utroque vereor tabernus. Amita abbas amet suppono verbum. Et vulgus taceo aiunt claustrum quam. Cedo caterva utilis aut cupiditate atrox. Beatus caute recusandae pax ad, damnatio adicio sequi viduo video damno, dicta eligendi catena cursus aspicio velociter.' });
  });


module.exports = router;
