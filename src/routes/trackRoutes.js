const express = require('express');
const mongoose = require('mongoose');
const requireAuthentification = require('../middlewares/requireAuthentification');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuthentification);

router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
});

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;
    if (!name || !locations) {
        return res.status(422).send({ error: "You must provide a name and locations." });
    }
    try {
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send('Error is ', err);
    }

})

module.exports = router;