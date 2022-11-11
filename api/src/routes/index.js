const { Router } = require('express');
const { API_KEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Importamos las tablas creadas en nuestra base de datos
const { Dog, Temperament } = require('../db')
// Para tratar la informacion extraida de la API usaremos Axios, por tanto debe ser importados con sus dependencias 
const axios = require('axios')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// En primera instancia debemos traer la informacion desde la API

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .catch (e => console.log(e)); 
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: `${el.height.metric} cm`,
            weight: `${el.weight.metric} kg`,
            lifeSpan: el.life_span,
            image: el.image.url,
            temperament: el.temperament,
            breed: el.breed_group
        }
    });
    return apiInfo;
};

// Ahora traemos la información que se guardara en la base de datos

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
};
 // Una vez obtenida la información desde la API y la DB, se combina para entregar la información mas completa

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
};

router.get('/dogs', async (req, res) => {
    let { name } = req.query;
    const totalDogs = await getAllDogs();
    try {
        if(name) {
            let dogName = await totalDogs.filter( dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ? 
            res.status(200).send(dogName) :
            res.status(404).send('No se pudo encontrar la informacion solicitada')
        } else {
            res.status(200).send(totalDogs);
        }
    } catch (e) {
        console.log(e)
    }
});

router.get('/dogs/:id', async (req, res) => {
    let { id } = req.params;
    let totalDogs = await getAllDogs();
    
    if(id) {
        let dogId = await totalDogs.filter( el => el.id == id);
        dogId.length ? 
        res.status(200).send(dogId) :
        res.status(404).send(`No se hallaron coincidencias para el ${id} ingresado`)
    }
});

router.post('/dogs', async (req, res) => {
    let {
        name,
        height,
        weight,
        lifeSpan,
        image,
        temperament
    } = req.body;
    try {
        
        let validateDog = await Dog.findOne({where: {name: name}})
        if(!validateDog){
            let dogCreate = await Dog.create({
                name,
                height: `${height.height_min} - ${height.height_max} cm`,
                weight: `${weight.weight_min} - ${weight.weight_max} cm`,
                lifeSpan,
                image
            });
            
            let temperamentDb = await Temperament.findAll({
                where: { name: temperament }
            });
        
            await dogCreate.addTemperament(temperamentDb);
        
            res.status(201).send('Dog creado correctamente')
        }
        else {
            res.status(202).send('Dog existente en memoria')
        }
    }
    catch (e) {
        res.status(400).send(e)
    }
    
});

router.get('/temperaments', async (req, res) => {
    const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .catch( e => console.log(e) );
    const temperaments = dogsApi.data.map(el => el.temperament?.split(', '))
    console.log(temperaments);
    const tempsEach = temperaments.flat(Infinity);
    console.log(tempsEach)
    const tempsTypes = [... new Set(tempsEach)];
    const sortTemps = tempsTypes.sort()
    console.log(sortTemps);
    sortTemps.forEach( el => {
        if (el) {
            Temperament.findOrCreate({
                where: { name: el }
            })
        } else return 'Temperament not Found';
    })
    const allTemps = await Temperament.findAll()
    res.status(200).send(allTemps)
})

/*router.delete('/dogs/:id', async (req, res) => {
    let { id } = req.params;
    let totalDogs = await getAllDogs();
    let dogId = await totalDogs.find( d => d.id == id);
    if (!dogId) return res.status(404).send(`No se hallaron coincidencias para el ${id} ingresado`)
    totalDogs = await totalDogs.filter(d => d.id !== id);
    res.status(200).send('Done');
})*/

module.exports = router;
