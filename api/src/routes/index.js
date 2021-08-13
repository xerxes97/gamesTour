const { Router, response } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Videogame, Genre} = require('../db'); 
const axios = require('axios')
const {API_KEY} = process.env;
const router = Router();
const {Op} = require('sequelize')
let prueba=0;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async(req, res, next)=>{
    console.log('prueba')
    let {search} = req.query;
    console.log(search)
    let resultsApi = [
        await axios.get(`https://rawg.io/api/games?page=1&key=${API_KEY}`),
        await axios.get(`https://rawg.io/api/games?page=2&key=${API_KEY}`),
        await axios.get(`https://rawg.io/api/games?page=3&key=${API_KEY}`),
        await axios.get(`https://rawg.io/api/games?page=4&key=${API_KEY}`),
        await axios.get(`https://rawg.io/api/games?page=5&key=${API_KEY}`)
    ]
    let resultLocalPromise = Videogame.findAll({include:Genre});
    
    if (!search) {
        return Promise.all([resultsApi, resultLocalPromise])
        .then(results=>{

            var resultLocal= results[1];
            var resultApi= [...results[0][0].data.results, ...results[0][1].data.results, ...results[0][2].data.results, ...results[0][3].data.results, ...results[0][4].data.results]
    
            resultLocal = resultLocal.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    image: game.image ? game.image : 'Imagen de prueba',
                    release: game.release,
                    rating: game.rating,
                    genres: game.genres
                }
            })
            
            resultApi = resultApi.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    release: game.released,
                    rating: game.rating,
                    genres: game.genres
                }
            })
            let prueba = resultLocal.concat(resultApi)
            res.send(resultLocal.concat(resultApi))
        })
        
    } else {
        resultsApi = axios.get(`https://rawg.io/api/games?search=${search}&page_size=15&key=${API_KEY}`);
        let resultLocalPromise = Videogame.findAll({
            where:{
                name:{[Op.like]: `%${search}%`}
            },
            include: Genre
        });

        return Promise.all([resultsApi, resultLocalPromise])
        .then(results=>{

            var resultLocal= results[1];
            var resultApi= results[0].data.results
    
            resultLocal = resultLocal.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    image: game.image ? game.image : 'Imagen de prueba',
                    release: game.release,
                    rating: game.rating,
                    genres: game.genres
                }
            })
            
    
            resultApi = resultApi.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    release: game.released,
                    rating: game.rating,
                    genres: game.genres
                }
            })
            res.send(resultLocal.concat(resultApi))
        })
        
    }    


})

router.post('/videogame', async(req, res)=>{
    let {name, image, description, release, gen, rating, platforms} = req.body
    prueba+=1
    let newGame= await Videogame.create({
        id: 'A'+prueba,
        name: name,
        image: image,
        description: description,
        release: release,
        rating: rating,
        platforms: platforms
    })

    let game = await newGame.addGenres(gen)

    res.send(newGame);
    // res.json('Creado')
})

router.get('/videogames/:id', async(req, res)=>{
    let {id} = req.params;
    console.log(req)
    if(Number.isInteger(parseInt(id.substr(0,1)))){
        let prueba= parseInt(id)
        await axios.get(`https://rawg.io/api/games?id=${prueba}&key=${API_KEY}`)
        .then(results=>{
            res.json(results.data.results)
        })

    }else{

        let localGame = await Videogame.findAll({
            where:{
                id: id
            }
        })

        res.json(localGame);
    }
})

router.get('/genres', async(req, res)=>{
    let genres= await Genre.findAll()
    res.json(genres)
})

router.get('/platforms', async(req, res)=>{
    // await axios.get(`https://api.rawg.io/api/platforms?page=1&key=${API_KEY}`)
    // .then(platforms=>res.json(platforms.data.results))

    let apiPlatforms =[
        await axios.get(`https://api.rawg.io/api/platforms?page=1&key=${API_KEY}`),
        await axios.get(`https://api.rawg.io/api/platforms?page=2&key=${API_KEY}`)]

    let total= Promise.all([apiPlatforms])
    .then((results)=>{

        let platformsResults=[...results[0][0].data.results, ...results[0][1].data.results]

        platformsResults.map(platform=>{
            return{
                id: platform.id,
                name: platform.name,
            }
        })

        res.json(platformsResults)
        
    })
})

module.exports = router;
