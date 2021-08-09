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
const {Genre} = require('./src/db'); 
const { default: axios } = require('axios');
const {API_KEY} = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then( async() => {
  const generos= await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  let apigeneros = generos.data.results;
  apigeneros = apigeneros.map(genero=>{
    return{
      id: genero.id,
      name: genero.name,
      image: genero.image_background
    }
  })

  await Genre.bulkCreate(apigeneros)

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
