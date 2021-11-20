import { useState } from 'react'
import { useMarvelService } from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/errorMessage'
import { Link } from 'react-router-dom';
import './searchCharForm.scss';

export const SearchCharForm = () => {
    const [char, setChar] = useState(null)
    const [charName, setCharName] = useState('')
    const [focus, setFocus] = useState(false)
    const [inputChanging, setInputChanging] = useState(false)
 
    const {getCharacterByName, loading, error, clearError} = useMarvelService()

    const updateChar = (e, name) => {
        e.preventDefault()
        clearError()
        getCharacterByName(name)
        .then(res => setChar(res))
    }
    const handleChange = (e) => {
        setCharName(e.target.value); 
        setInputChanging(true); 
        setChar(null)
    }
    const handleBlur = () => {
        setFocus(false); 
        setInputChanging(false)
    }
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null
    const RequiredValue = () => {
        return (
            <div className="char__search-error">
                This field is required
            </div>
        )
    }
    const LinkToCharPage = () => {
        return (
            <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
            </div>
        )
    } 
    const CharNotFound = () => {
        return(
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>
        )
    }
    const searchResult = !char ? null : char.length > 0 ? <LinkToCharPage/> : <CharNotFound/>
    const required = !focus ? null : !charName ? <RequiredValue/> : null
    return (
        <>
        <div className="char__search-form">
            <form onSubmit={(e) => updateChar(e, charName)}>
                <label className="char__search-label"  htmlFor='charname'>Or find a character by name:</label>
                <div className="char__search-wrapper">
                 <input 
                    id='charName'
                    placeholder='Enter name'
                    value={charName}
                    onChange={handleChange}
                    onFocus={() => setFocus(true)}
                    onBlur={handleBlur}>
                </input>
                <button 
                    className="button button__main"
                    disabled={loading}>
                    <div className="inner">find</div>
                </button>
                </div>
            </form>
            {required}
            {inputChanging ? null : searchResult}
        </div>
        {errorMessage}
        </>
    )
}
