import { useParams} from "react-router-dom";
import { useState, useEffect } from 'react'

import {useMarvelService} from '../../services/MarvelService'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/errorMessage'
import { AppBanner } from "../appBanner/AppBanner";

export const SingleItemPage = ({Component, data}) => {
    const {id} = useParams()
    console.log(id)
    const [item, setItem] = useState([])
    const {loading, error, getCharacter, getComic, clearError} = useMarvelService()
    const itemLoad = (id) => {
        clearError()
        switch(data) {
            case 'char' :
                getCharacter(id)
                .then(char => setItem(char))
                break;
            case 'comic' :
                getComic(id)
                .then(comic => setItem(comic))
                    break;
            default : return   
        }
        
    }
    
    useEffect(() => {
        itemLoad(id)
    }, [])
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <Component item={item}/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    return (
        <div>
            <AppBanner/>
            {spinner}
            {content}
            {errorMessage}
        </div>
        
    )
}

