
const axios = require('axios');
const { Raza, Temperamento } = require('../db.js');
const { API_KEY } = process.env;

const link = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`


const totalApi = async () => {
    const { data } = await axios.get(link)
   
    const info = await data.map(i => {

        let temperamentArray = [];
        if (i.temperament) {
            temperamentArray = i.temperament.split(", ");
        }

        let heightArray = [];
        heightArray = i.height.metric.includes('NaN') ? i.height.metric.replace('NaN', '0').split('-') : i.height.metric.split('-')

        let weightArray = [];
        weightArray = i.weight.metric.includes('NaN') ? i.weight.metric.replace('NaN', '0').split('-') : i.weight.metric.split('-')

        return {
            id: i.id,
            name: i.name,
            height: heightArray,
            weight: weightArray,
            years_of_life: i.life_span,
            image: i.image,
            temperament: temperamentArray
        }
    })
    console.log(info)
    return info;
}
const totalDb = async () => {
    return await Raza.findAll({ 
        include: {
            model: Temperamento,
            attributes: ['name'], 
            through: { 
                attributes: [],
            },
        }
    });
};
const tot_Api_Db = async () => {
    const apiInfo = await totalApi();
    const dbInfo = await totalDb();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
};
const getDogs = async (req, res) => {
    
    const { name } = req.query; 
    const allDog = await tot_Api_Db();
    if (name) {
        
        const byName = await allDog.filter(i => i.name.toLowerCase().includes(name.toLocaleLowerCase()))
        byName.length ? 
            res.status(200).send(byName) : 
            res.status(404).send("there is not dog with that name");
    } else {
        res.status(200).send(allDog)
    };
};
const getTemperaments = async (req, res) => {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    let temperaments = data.map(i => i.temperament).join().split(',');

    await temperaments.forEach(async name => {
        if (name)
            await Temperamento.findOrCreate({
                where: { name: name.trim() }, 
            }).catch(error => {
                console.log(error);
            });
    });

    return res.status(200).send(await Temperamento.findAll());
};
const getDogsById = async (req, res) => {

    const { id } = req.params
    const dogsTotal = await tot_Api_Db()
    if (id) {
        let dogsId = await dogsTotal.filter(i => i.id == id)
        dogsId.length ?
            res.status(200).json(dogsId) :
            res.status(404).send('No se encuentra esa raza')
    }
};
const postDogs = async (req, res) => {


    try {
        let {
            name,
            height,
            weight,
            years_of_life,
            temperament,
            image,
            createdInBd
        } = req.body
        
        let dogName = await tot_Api_Db().then((d) => d.find((d) => d.name === name)); // se fija si el nombre esta en la api

        if(!name ||  !height[0] || !height[1] || !weight[0] || !weight[1]  ||  !temperament){
            res.status(400).send("Faltan datos"); /// 400 porque faltan datos
        } else if (dogName){ // si el nombre esta en la api
            res.status(404).send("El nombre del perro ya existe"); // 404 porque el nombre ya existe
        } else if (height[1] < height[0] || weight[1] < weight[0]){
            res.status(400).send("Los datos minimos no pueden ser mayor a los datos maximos"); // 400 porque los datos son invalidos
        } else if (height[1] > 200 || height[0] < 0 || weight[1] > 100 || weight[0] < 0 || years_of_life > 30 || years_of_life < 0){
            res.status(400).send("Datos invalidos"); // 400 porque los datos son invalidos
        } else if (temperament === null){
            res.status(400).send("Temperamento invalido, debe ser un array de strings"); // 400 porque el temperamento es invalido
        } else{
        const razaCreated = await Raza.create({
            name,
            height,
            weight,
            years_of_life,
            image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
            createdInBd
        })
        let temperamentoDb = await Temperamento.findAll({
            where: { name: temperament }//dentro de este modelo encontra 
        })
        razaCreated.addTemperamento(temperamentoDb);//addTemperamento es un metodo de sequelize que me trae de la tabla lo que le paso
        return res.status(200).send('Dog creado con exito');

    }
    } catch (err) {
        return res.status(500).send('error creación dogs');
    }
};


module.exports = {
    tot_Api_Db,
    getDogs,
    getTemperaments,
    getDogsById,
    postDogs
}