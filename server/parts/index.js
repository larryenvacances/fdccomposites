const express = require('express')
const router = express.Router()
const PartModel = require('../db/models/partModel')
const Part = require('../db/models/part')

router.get('/history', (req, res, next) => {
	console.log('===== parts/history!!======')
  if (req.user) {
    PartModel.find({fullName: req.query.fullName}).exec().then((part => {
      res.json({ part: part });
    }));
	} else {
		res.send(401, 'not logged in');
	}
})

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
  console.log('===== parts/add!!======');
  if (req.user) {
    let fullName = req.query.model + '-' + req.query.serialNumber;
    let part = new Part({
      model: req.query.model,
      serialNumber: req.query.serialNumber,
      fullName: fullName
    });
    
    part.save((err) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate username
          return res.status(422).send({ succes: false, message: 'une pièce avec ce numéro existe déjà' });
        }
  
        // Some other error
        return res.status(500).send(err);
      }

      res.status(200).send();
    })
	} else {
		res.send(401, 'not logged in');
	}
})

module.exports = router
