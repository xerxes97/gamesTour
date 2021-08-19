export default function validate(input){
    let errors = {}

    if(!input.name){
        errors.name='The name es required';
    }

    if(!input.rating){
        errors.rating='The rating is required'
    } else if(!Number.isInteger(parseInt(input.rating))){
        errors.rating='The rating have tobe a number between 0 and 5'
    }

    if(!input.release){
        errors.release='The date is required or is invalid'
    }

    return errors
}