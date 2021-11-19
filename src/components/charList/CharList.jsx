import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {useMarvelService} from '../../services/MarvelService'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/errorMessage'

import './charList.scss'

export const CharList = (props) => {

    const {loading, error, getAllCharacters} = useMarvelService()
    const [charList, setCharList] = useState([])
    const [offset, setOffset] = useState(210)
    const [newCharsLoading, setNewCharsLoading] = useState(false)
    const [charEnded, setCharEnded] = useState(false)

    const updateCharlist = newChars => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }
         setCharList(charList => ([...charList,...newChars])) 
         setOffset(offset => offset + 9)
         setNewCharsLoading(false)
         setCharEnded(ended)
    }
    const onRequest = (offset, initial) => {
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true)
        getAllCharacters(offset)
            .then(newChars => updateCharlist(newChars))
     }
     useEffect(() => {
         onRequest(offset, true)
     },[])
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            const {id, name, thumbnail} = item
            let imgNotFound = thumbnail.includes('image_not_available')
            let imgStyle = imgNotFound ? {objectFit: 'unset'} : {objectFit: 'cover'} 
            return (
               <li 
                className="char__item" 
                key={id}
                tabIndex={0}
                onClick={() => {
                    props.onCharSelected(id)
                    }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        props.onCharSelected(id);
                    }
                    }}>
               <img 
                   src={thumbnail} 
                   alt={name}
                   style={imgStyle}/>
               <div className="char__name">{name}</div>
               </li>
            )
       })
       return(
        <ul className="char__grid">
            {items}
        </ul>
       )
     }

    const items = renderItems(charList)
    const spinner = loading && !newCharsLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newCharsLoading}
                style={charEnded? {display: 'none'} : {display: 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )  
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}