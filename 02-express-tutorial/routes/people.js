const express = require('express');
const router = express.Router();

const { getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')


router.get('/', getPeople)  //GET METHOD
router.post('/', createPerson)  // POST METHOD
router.post('/postman', createPersonPostman)
router.put('/:id', updatePerson)    // PUT METHOD
router.delete('/:id', deletePerson) //DELETE METHOD




module.exports = router
