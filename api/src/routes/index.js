const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Raza, Temperamento, temp_dog} = require('../db.js')
const router = Router();
const {tot_Api_Db} = require('./controlers.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async(req, res) => {
    //const name = req.query.name
    const {name} = req.query; //esta constante pregunta si hay un query con la propiedad name
    const allDog = await tot_Api_Db();
    if(name) {
        /*aca estoy preguntando si me han pasado algo por query, si es asi...
        declaro una constante donde voy a guardar todos los dogs que incluyan
        ese nombre y lo paso todo a minuscula por si el cliente pone algo en mayusc. */
        const byName = await allDog.filter(i => i.name.toLowerCase().includes(name.toLocaleLowerCase()))
        byName.length ? //estoy preguntando si encontro algo
        res.status(200).send(byName) : //si lo encontro respondo ese filtrado
        res.status(404).send("there is not dog with that name");
    } else {
        res.status(200).send(allDog)//si no hay un query traigo todos los personajes
    };
});

router.get ('/temperaments', async (req, res) => {
    const {data} = await axios.get ('https://api.thedogapi.com/v1/breeds');
  
    let temperaments = data.map (i => i.temperament).join ().split (',');
  
    await temperaments.forEach (async name => {
      if (name)
        await Temperamento.findOrCreate ({
          where: {name: name.trim()}, //trim me quita los espacios a los costados del texto
        }).catch (error => {
          console.log (error);
        });
    });
  
    return res.status (200).send (await Temperamento.findAll ());
});

router.get('/dogs/:id', async (req,res) =>{
    const {id} = req.params
    const dogsTotal = await tot_Api_Db()//me traigo todas las razas
    if(id){
        let dogsId = await dogsTotal.filter(i => i.id == id)//me traigo la raza que coincida con el id
        dogsId.length?
        res.status(200).json(dogsId) :
        res.status(404).send('No se encuentra esa raza')
    }
})

router.post('/dogs', async (req,res) =>{
    
    let {
        name,
        height,
        weight,
        years_of_life,
        temperament
    } = req.body

    console.log(name, height, weight,years_of_life)

    const razaCreated = await Raza.create({
        name,
        height,
        weight,
        years_of_life
    })

    let temperamentoDb = await Temperamento.findAll({
        where: {name: temperament}//dentro de este modelo encontra 
    })
    razaCreated.addTemperamento(temperamentoDb);//addTemperamento es un metodo de sequelize que me trae de la tabla lo que le paso
    return res.status(200).send('Personaje creado con exito')
})

module.exports = router;
