const router = require('express').Router()
// const x = require('../controllers/control')

router.get('/', (req, res) => res.send('server is up and running'))

router.get('/books', (req, res) => res.json({ message: 'BOOKs' }))

module.exports = router