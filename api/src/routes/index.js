const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const {

    getDogs, 
    getTemperaments, 
    getDogsById, 
    postDogs,
    putDog

} = require('./controlers.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); 

router.get('/dogs/:id', getDogsById)

router.get('/dogs',getDogs);

router.get ('/temperaments', getTemperaments)

router.post('/dogs', postDogs)

router.put('/dogs', putDog)

module.exports = router;
