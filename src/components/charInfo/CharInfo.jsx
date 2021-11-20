import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {useMarvelService} from '../../services/MarvelService'
import { setContent } from '../../utils/setContent'


import './charInfo.scss'

export const CharInfo = (props) => {
    
    const {getCharacter, clearError, process, setProcess} = useMarvelService()
    const [char, setChar] = useState(null)
    const {charId} = props
    
    const updateChar = () => {
        if(!charId) {
          return
        }
        clearError()       
       getCharacter(charId)
            .then(char => setChar(char))
            .then(() => setProcess('confirmed'))
    }
    useEffect(() => {
        updateChar(charId)
    },[charId])

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, homepage, wiki, thumbnail, description, comics} = data;
    const comicItems = comics.map((item, i) =>  { 
        return (
            <li 
                className="char__comics-item"
                key={i}>
                {item.name}
            </li>
    )})
    let comicsContent = comics.length === 0 ? 'There is no info :(' : comicItems
    const imgNotFound = thumbnail.includes('image_not_available')
    let imgStyle = imgNotFound ? {objectFit: 'unset'} : {objectFit: 'cover'}
    return (
        <>
        <div className="char__basics">
            <img 
                src={thumbnail} 
                alt={name}
                style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comicsContent}
        </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}