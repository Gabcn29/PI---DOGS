// Importamos react, y los hooks que usaremos 
import React, { useEffect, useState } from "react";
// Importamos Link y useHistory desde react-router-dom
import { Link, useHistory } from "react-router-dom";
// Importamos las acciones que utilizaremos desde nuestras actions
import { getTemperaments, postDog } from "../../Redux/Actions";
// Importamos los hooks de react - redux
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
    let errors = {};
    if( !/\w/.test(input.name)){errors.name = 'invalid name, it should be like pomeranian e.g., please try again'};

    if(!/^\d+$/.test(input.height.height_min) || !/^\d+$/.test(input.height.height_max)){errors.height = 'Height min and max shoulb be a number, e.g. 1, 2, 54, etc; please try again'}

    else if(input.height.height_min > input.height.height_max){errors.height = ' Max Height should be bigger than height min'};

    if(isNaN(input.weight.weight_min) || isNaN(input.weight.weight_max)){errors.weight = 'Min and Max Weight shoulb be a number, e.g. 1, 2, 54, etc; please try again'}
    
    else if(input.weight.weight_min > input.weight.weight_max){errors.weight = 'Max Weight should be bigger than weight min'};

    if(!/^\d+$/.test(input.lifeSpan)){errors.lifeSpan = 'LifeSpan should be a range, e.g. 1 - 2, 54 - 75, etc; please try again'};

    let regEXpUrlWithProt = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    if(!regEXpUrlWithProt.test(input.image)){errors.image = 'It should a validate URL, e.g. https://www.google.com.co/?gfe_rd=cr&ei=nhyCVoH0FobF-AXwzrnwBw; please try again'}

    if(!input.temperament.length){errors.temperament= 'It should have at least one temperament'}
    console.log(errors);
    return errors
}

export default function DogCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    // Nos traemos los temperamentos desde nuestro state en el reducer
    const temperaments = useSelector((state) => state.temperaments);
    
    // Creamos estados locales para controlar los inputs de la información que se pasará por body al post y asi crear nuestro elemento en la tabla de nuestro back.
    const [input, setInput] = useState({ 
        name: '',
        image:'',
        height: {
            height_min:'',
            height_max:''
        },
        weight: {
            weight_min:'',
            weight_max:''
        },
        lifeSpan:'',
        temperament:[], 
    });

    const [error, setError] = useState({})

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    //Creamos el controlador de los estados de nuestros inputs
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    } 

    const handleOnChangeHeight = (e) => {
        setInput({
            ...input,
            height: {...input.height,
                [e.target.name]: e.target.value},           
        });

        setError(validate({
            ...input,
            height: {...input.height,
                [e.target.name]: e.target.value},
        }));
        console.log(input)
    }
    const handleOnChangeWeight = (e) => {
        setInput({
            ...input,
            weight: {...input.weight,
                 [e.target.name]: e.target.value},           
        });

        setError(validate({
            ...input,
            weight: {...input.weight,
                [e.target.name]: e.target.value},
        }));

        console.log(input)
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        });

        setError(validate({
            ...input,
        }))
        
    }
    console.log(input)
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        if(!Object.keys(error).length){
        dispatch(postDog(input));
        alert('Successfully Added!!!');
        setInput({ 
            name: '',
            image:'',
            height: {
                height_min:'',
                height_max:''
            },
            weight: {
                weight_min:'',
                weight_max:''
            },
            lifeSpan:'',
            temperament:[], 
        });
        history.push('/home')
    }
    }

    let id = 0;

    const handleDelete = (el) => {
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== el)
        })
    }

    return (
        <div>
            <Link to= '/home'><button >Back</button></Link>
            <h1>Add Your Dog</h1>
            <form onSubmit={e => handleOnSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input
                    type= 'text'
                    placeholder='Name'
                    value= {input.name}
                    name= 'name'
                    key='name'
                    onChange={e => handleChange(e)}
                    required
                    />
                    {error.name && <p>{error.name}</p>}
                </div>
                <div>                   
                    <label>Min Height: </label>
                        <input 
                        type='text'
                        placeholder='Min Height' 
                        value={input.height.min}
                        name='height_min'
                        key='height_min'
                        onChange={e => handleOnChangeHeight(e)}
                        required
                        />                    
                    {error.height && <p>{error.height}</p>}
                </div>
                <div>    
                    <label>Max Height: </label>
                        <input 
                        type='text' 
                        placeholder='Max Height'
                        value={input.height.max}
                        name='height_max'
                        key='height_max'
                        onChange={e => handleOnChangeHeight(e)}
                        required
                        />
                    {error.height && <p>{error.height}</p>}
                </div>
                <div>                    
                    <label>Min Weight: </label>
                        <input 
                        type='text'
                        placeholder='Min Weight' 
                        value={input.weight.min}
                        name='weight_min'
                        key='weight_min'
                        onChange={e => handleOnChangeWeight(e)} 
                        required
                        />
                    {error.weight && <p>{error.weight}</p>}
                </div>
                <div>
                    <label>Max Weight: </label>
                        <input 
                        type='text'
                        placeholder='Max Weight' 
                        value={input.weight.max}
                        name='weight_max'
                        key='weight_max'
                        onChange={e => handleOnChangeWeight(e)}
                        required
                        />
                    {error.weight && <p>{error.weight}</p>}
                </div>              
                <div>
                    <label>Lifespan: </label> 
                    <input 
                    type='text'
                    placeholder='Lifespan' 
                    value={input.lifeSpan}
                    name='lifeSpan'
                    onChange={e => handleChange(e)}
                    required
                    />
                    {error.lifeSpan && <p>{error.lifeSpan}</p>}
                </div>                
                <div>
                    <label>Image: </label>
                    <input 
                    type='text' 
                    placeholder='Image URL'
                    value={input.image}
                    name='image'
                    required
                    onChange={e => handleChange(e)}
                    /> 
                    {error.image && <p>{error.image}</p>}                    
                </div>
                <label>Temperaments:</label> 
                <select onChange={e => handleSelect(e)}>                    
                    { temperaments?.map((temps) => 
                        (<option value={temps.name} key={temps.id}>
                            {temps.name}
                        </option>))                        
                    }
                </select>
                {error.temperament && <p>{error.temperament}</p>}               
                {error.temperament ? null : <button type='submit'>Add Dog</button>}
            </form>
            {
                input.temperament.map(el => 
                    <div key={id++} justify-content='space-around'>
                        <p>{el}</p>
                        <button name="X button" onClick={() => handleDelete(el)}>X</button>
                    </div>

                )}
        </div>
    )     

}

