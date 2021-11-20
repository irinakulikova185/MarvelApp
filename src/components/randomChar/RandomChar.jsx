import { useState, useEffect } from 'react'

import {useMarvelService} from '../../services/MarvelService'
import { setContent } from '../../utils/setContent'

import mjolnir from '../../resources/img/mjolnir.png'

import "./randomChar.scss"


export const RandomChar = () => {
    const {getCharacter, clearError, process, setProcess} = useMarvelService()
    const [char, setChar] = useState(null)
    const onCharLoaded = (char) => {
        setChar(char)   
    }
    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
        .then(char => onCharLoaded(char))
        .then(() => setProcess('confirmed'))
    }
    useEffect(() => {
        updateChar()
    },[])
    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    className="button button__main"
                    onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    console.log(homepage)
    let imgNotFound = thumbnail.includes('image_not_available')
    let imgStyle = imgNotFound ? {objectFit: 'unset'} : {objectFit: 'cover'} 
     return (
        <div className="randomchar__block">
            <img 
                src={thumbnail} 
                alt="Random character" 
                className='randomchar__img'
                style={imgStyle}
                />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
     )   
}