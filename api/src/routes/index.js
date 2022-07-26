const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const {

    getDogs, 
    getTemperaments, 
    getDogsById, 
    postDogs,
    deleteDogs

} = require('./controlers.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getDogs);

router.get ('/temperaments', getTemperaments)

router.get('/dogs/:id', getDogsById)

router.post('/dogs', postDogs)

router.delete('/dogs/:id', deleteDogs)

module.exports = router;
