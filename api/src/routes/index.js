const { Router, response } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Videogame, Genre} = require('../db'); 
const axios = require('axios')
const {API_KEY} = process.env;
const router = Router();
let prueba=0;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', (req, res, next)=>{

    let {search} = req.query;
    let resultsApi = axios.get(`https://rawg.io/api/games?page_size=100&key=${API_KEY}`);
    let resultLocalPromise = Videogame.findAll({include:Genre});
    
    if (!search) {
    
        return Promise.all([resultsApi, resultLocalPromise])
        .then(results=>{
            console.log(results[1])

            var resultLocal= results[1];
            var resultApi= results[0].data.results
    
            resultLocal = resultLocal.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    image: game.image ? game.image : 'Imagen de prueba',
                    rating: game.rating,
                    genres: game.genres
                }
            })
            
    
            resultApi = resultApi.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    rating: game.rating,
                    genres: game.genres
                }
            })
    
            res.send(resultLocal.concat(resultApi))
        })
        
    } else {
        resultsApi = axios.get(`https://rawg.io/api/games?search=${search}&page_size=15&key=${API_KEY}`);
        let resultLocalPromise = Videogame.findAll({
            name:{$like:`%${search}%`},
            attributes:{
                include: ['Genre']
            }
        });

        return Promise.all([resultsApi, resultLocalPromise])
        .then(results=>{
            console.log(results[1])
            var resultLocal= results[1];
            var resultApi= results[0].data.results
    
            resultLocal = resultLocal.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    image: game.image ? game.image : 'Imagen de prueba',
                    rating: game.rating,
                    genres: game.gen
                }
            })
            
    
            resultApi = resultApi.map(game=>{
                return{
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
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
    if(Number.isInteger(parseInt(id.substr(0,1)))){

        axios.get(`https://rawg.io/api/games?id=${id}&key=${API_KEY}`)
        .then(results=>{
            res.json(results.data.results)
        })

    }else{
        console.log(id)
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

module.exports = router;
