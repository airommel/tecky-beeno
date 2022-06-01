import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

export function NoMatch (){
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        },2000);
    },[])
    return (
        <div>
            It seems that you have arrived at a wrong page.
            Going to redirect you in 2 seconds...
        </div>
    )
}