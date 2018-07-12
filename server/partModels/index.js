const express = require('express')
const router = express.Router()
const Part = require('../db/models/part')

router.get('/active', (req, res, next) => {
	console.log('===== parts/active!!======')
  if (req.user) {
    Part.find().select('model -_id').exec().then((parts => {
      let uniqueModels = [...new Set(parts.map(x => x.model))];
      res.json(uniqueModels);
    }));
	} else {
		res.send(401, 'not logged in');
	}
})

module.exports = router
