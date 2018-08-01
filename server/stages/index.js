const express = require('express')
const router = express.Router()
const Stages = require('../db/models/stage')

router.get('/', (req, res, next) => {
	console.log('===== stages!!======')
	console.log(req.user)
	if (req.user) {
    Stages.find().select({name: 1, order: 1, _id: 0}).sort('order').exec().then((stages => {
      res.json({ stages: stages });
    }));
	} else {
		res.send(401, 'not logged in');
	}
})

module.exports = router
