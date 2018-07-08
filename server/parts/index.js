const express = require('express')
const router = express.Router()
const PartModel = require('../db/models/partModel')

router.get('/', (req, res, next) => {
	console.log('===== parts!!======')
	console.log(req.user)
	if (req.user) {
    PartModel.find().select({name: 1, _id: 0}).exec().then((partModels => {
      res.json({ partModels: partModels });
    }));
	} else {
		res.send(401, 'not logged in');
	}
})

module.exports = router
