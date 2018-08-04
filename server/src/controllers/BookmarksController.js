const {Bookmark} = require('../models');

module.exports = {
    async index(req, res) {
        try {

            const {songId, userId} = req.query
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            res.send(bookmark)

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to bookmark songs'
            })

        }

    },
    async index1(req, res) {
        try {
            const bookmark = await Bookmark.findAll()
            res.send(bookmark)

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to find bookmarked songs'
            })

        }

    },
    async post(req, res) {
        try {

            const {songId, userId} = req.body.params
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            if(bookmark) {
                return res.status(400).send({
                    error: 'You already have this set as a bookmark'
                })
            } else {
                console.log('bookmark created')
                const newBookmark = await Bookmark.create({
                    SongId: songId,
                    UserId: userId
                })
                res.send(newBookmark)
            }


        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create bookmark'
            })

        }

    },
    async delete(req, res) {
        try {

            const {songId, userId} = req.query
            const bookmark = await Bookmark.findOne({
                where:{
                    SongId: songId,
                    UserId: userId
                }
            })
            await bookmark.destroy()
            res.send(bookmark)

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete bookmark'
            })

        }

    }
}