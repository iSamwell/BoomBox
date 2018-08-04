const {Song} = require('../models');

module.exports = {
    async index(req, res) {
        try {
            let song = null
            const search = req.query.search
            console.log(search)
            if(search) {
                song = await Song.findAll({
                    where: {
                        $or: [
                            'title', 'artist', 'genre', 'album'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`
                            }
                        }))
                    }
                })
            } else {
                 song = await Song.findAll({
                    limit: 10
                })
            }

            res.send(song)

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch songs'
            })

        }
    },
    async show(req, res) {
        try {
            const song = await Song.findById(req.params.songId)
            res.send(song)

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch song'
            })

        }
    },
    async post(req, res) {
        try {
            const songs = await Song.create({
                title: req.body.title,
                artist: req.body.artist ,
                genre: req.body.genre,
                album: req.body.album,
                albumImage:'localhost:8081/uploads/' + req.file.filename,
                youtubeId: req.body.youtubeId,
                lyrics:req.body.lyrics,
                tab:req.body.tab
            })
            res.send(songs);

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create the songs'

            })
        }
    },
    async put(req, res) {
        try {
            const songs = await Song.update({
                title: req.body.title,
                artist: req.body.artist ,
                genre: req.body.genre,
                album: req.body.album,
                albumImage:'localhost:8081/uploads/' + req.file.filename,
                youtubeId: req.body.youtubeId,
                lyrics:req.body.lyrics,
                tab:req.body.tab
            }, {
                where: {
                    id: req.params.songId
                }
            })
            res.send(songs);

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to update the songs'

            })
        }
    }
}
