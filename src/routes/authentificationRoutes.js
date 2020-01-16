const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
    res.send('Post request made');
});

module.exports = router;