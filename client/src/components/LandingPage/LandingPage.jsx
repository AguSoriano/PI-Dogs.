import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
       <div>
           <h1>BIENVENIDOS A LA APP DE DOGS</h1>
           <Link to ='/dogs'>
               <button>Comenzar</button>
           </Link>
       </div> 
    )
}
// style="color:white"