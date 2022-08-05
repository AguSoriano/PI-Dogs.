
const axios = require('axios');
const {Raza, Temperamento, temp_dog} = require('../db.js');
const {API_KEY} = process.env;

const link = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`


const totalApi = async () => {
    const {data} = await axios.get(link)
    //console.log(data)
    //let temperaments = data.map (i => i.temperament).join ().split (',');
    const info = await data.map(i => {
        let temperamentArray = [];
        if (i.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
            temperamentArray = i.temperament.split(", ");
        }
        return {
            id: i.id,
            name: i.name,
            height: i.height.metric,
            weight: i.weight.metric.includes('NaN')? i.weight.metric.replace('NaN', '0').split('-'): i.weight.metric.split('-'),
            years_of_life: i.life_span,
            image: i.image,
            temperament: temperamentArray
        }
    })
    //console.log(info)
    return info;
}
const totalDb = async() => {
    return await Raza.findAll({ //traeme todos los personajes e incluime el modelo temper
        include: {
            model: Temperamento,
            attributes: ['name'], //traeme el modelo de temper mediante el atributo name
            through: { //esto es una comprobacion para que lo busque en atributos
                attributes: [],
            },
        }
    });
};
const tot_Api_Db = async() => {
    const apiInfo = await totalApi();
    const dbInfo = await totalDb();
    const allInfo = apiInfo.concat(dbInfo);
    console.log(allInfo)
    return allInfo;
};
const getDogs = async(req, res) => {
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
};
const getTemperaments = async (req, res) => {
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
};
const getDogsById = async (req,res) =>{
    
    const {id} = req.params
    const dogsTotal = await tot_Api_Db()//me traigo todas las razas
    if(id){
        let dogsId = await dogsTotal.filter(i => i.id == id)//me traigo la raza que coincida con el id
        dogsId.length?
        res.status(200).json(dogsId) :
        res.status(404).send('No se encuentra esa raza')
    }
};
const postDogs = async (req,res) =>{
    
 try{
        let {
        name,
        height,
        weight,
        years_of_life,
        temperament
    } = req.body
    //console.log(name, height, weight,years_of_life)
    
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

    } catch (err){
        console.log(err)
    }
};
const deleteDogs = async (req, res) => {
await Raza.destroy({
    where: {
        id:req.params.id
    }
})
return res.status(200).send('Perro eliminado con exito')
}

module.exports = {
    tot_Api_Db,
    getDogs,
    getTemperaments,
    getDogsById,
    postDogs,
    deleteDogs
}