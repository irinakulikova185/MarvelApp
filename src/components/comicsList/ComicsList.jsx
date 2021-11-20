import { useState, useEffect } from 'react/cjs/react.development'
import { Link} from 'react-router-dom'

import { useMarvelService } from '../../services/MarvelService'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/errorMessage'

import './comicsList.scss'

const setContent = (process, Component, newItemsLoading) => {
    switch(process) {
        case 'waiting': 
            return <Spinner/>;
        case 'loading': 
            return newItemsLoading ? <Component/> : <Spinner/> 
        case 'confirmed':
            return <Component/> 
        case 'error':
            return <ErrorMessage/>     
        default:
            throw new Error('Unexcected process type')    
    }
}

export const ComicsList = () => {
    const {getAllComics, process, setProcess} = useMarvelService()
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(210)
    const [moreComicsLoading, setMoreComicsLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false)

    const onRequest = (initial) => {
        initial ? setMoreComicsLoading(false) : setMoreComicsLoading(true)
        getAllComics(offset)
        .then(comicsList => onComicsLoad(comicsList)) 
        .then(() => setProcess('confirmed'))  
    }
    const onComicsLoad = newComics => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList,...newComics])
        setOffset(offset => offset + 8)
        setMoreComicsLoading(false)
        setComicsEnded(ended)
    }
    useEffect(() => {
      onRequest(true)
    },[])
  
    const renderItems = arr => {
        const items = arr.map(item => {
            const {title, price, id, thumbnail} = item
            let imgNotFound = thumbnail.includes('image_not_available')
            let imgStyle = imgNotFound ? {objectFit: 'unset'} : {objectFit: 'cover'} 
            return (
                <li 
                    className="comics__item"
                    key={id}>
                    <Link to={`/comics/${id}`}>
                        <img 
                            src={thumbnail} 
                            alt='title' 
                            className="comics__item-img"
                            style={imgStyle}/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    } 
    
    return (
        <div className="comics__list">
           {setContent(process, () => renderItems(comicsList), moreComicsLoading)}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(false)}
                disabled={moreComicsLoading}
                style={comicsEnded? {display: 'none'} : {display: 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}