import { useParams} from "react-router-dom";
import { useState, useEffect } from 'react'

import {useMarvelService} from '../../services/MarvelService'
import { AppBanner } from "../appBanner/AppBanner";
import { setContent } from '../../utils/setContent'

const SingleItemPage = ({Component, data}) => {
    const {id} = useParams()
    console.log(id)
    const [item, setItem] = useState([])
    const {getCharacter, getComic, clearError, process, setProcess} = useMarvelService()
    const itemLoad = (id) => {
        clearError()
        switch(data) {
            case 'char' :
                getCharacter(id)
                .then(char => setItem(char))
                .then(() => setProcess('confirmed'))
                break;
            case 'comic' :
                getComic(id)
                .then(comic => setItem(comic))
                .then(() => setProcess('confirmed'))
                    break;
            default : return   
        }
        
    }
    
    useEffect(() => {
        itemLoad(id)
    }, [])
    return (
        <div>
            <AppBanner/>
            {setContent(process, Component, item)}
        </div>
        
    )
}

export default SingleItemPage

