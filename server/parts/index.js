const express = require('express')
const router = express.Router()
const PartModel = require('../db/models/partModel')
const Part = require('../db/models/part')

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

router.post('/add', (req, res, next) => {
  if (req.user) {
    console.log('===== parts/add!!======');
    let fullName = req.query.model + '-' + req.query.serialNumber;
    Part.insertMany([{
      model: req.query.model,
      serialNumber: req.query.serialNumber,
      fullName: fullName
    }])
    .then(
      res.send(200)
    )
	} else {
		res.send(401, 'not logged in');
	}
})

module.exports = router
