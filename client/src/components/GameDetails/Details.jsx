import {useParams} from 'react-router-dom'

export default function Details(){
    let {id} = useParams();
    console.log(id);
    return(
        <div>
            
        </div>
    )
}