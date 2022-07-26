//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || 3001;
//La ventaja de esto es que a la hora de hacer un deploy, necesitamos que
//se nos pase este puerto

// Syncing all the models at once.
conn.sync({ force: true }).then(() => { //el force true lo que hace es que cada vez que corto la base de datos lo vuelve a generar de nuevo
  server.listen(PORT, () => { //iniciamos el servidor
    console.log(`Servidor corriendo en el puerto ${PORT}`); // eslint-disable-line no-console
  });
});