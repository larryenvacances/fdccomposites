const express = require('express')
const router = express.Router()
const PartModel = require('../db/models/partModel')
const Part = require('../db/models/part')

router.get('/history', (req, res, next) => {
	console.log('===== parts/history!!======')
  if (req.user) {
    Part.find({fullName: req.query.fullName}).select({_id: 0, __v: 0}).exec().then((part => {
      console.log(req.query.fullName)
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

router.post('/edit', (req, res, next) => {
  console.log('===== parts/edit!!======');
  if (req.user) {
    let fullName = req.query.fullName;
    let stage = req.query.stage;
    Part.findOne({fullName: fullName}, (err, part) => {
      if (err) res.send(500);
      
      part.lastModifiedBy = req.user.local.username;
      part.lastModifiedOn = Date.now();
      part.stage = stage;
      part.save((err, updatedPart) => {
        if (err) res.send(500);
        res.send(200);
      });
    });
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
      fullName: fullName,
      lastModifiedBy: req.user.local.username,
      lastModifiedDate: Date.now(),
      stage: 'Préparation Tissus & Core'
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
