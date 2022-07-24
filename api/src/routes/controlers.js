
const axios = require('axios');
const {Raza, Temperamento, temp_dog} = require('../db.js')

const totalApi = async () => {
    const {data} = await axios.get('https://api.thedogapi.com/v1/breeds')
    //console.log(data)
    const info = await data.map(i => {
        
        return {
            id: i.id,
            name: i.name,
            height: i.height,
            weight: i.weight,
            years_of_life: i.life_span,
            image: i.image
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
//console.log(totalDb())

const tot_Api_Db = async() => {
    const apiInfo = await totalApi();
    const dbInfo = await totalDb();
    const allInfo = apiInfo.concat(dbInfo);
    console.log(allInfo)
    return allInfo;
};
//console.log(tot_Api_Db());

module.exports = {
    tot_Api_Db
}