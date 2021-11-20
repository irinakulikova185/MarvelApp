import { useHttp } from "../hooks/useHttp";

export const useMarvelService = () => {

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const  _baseOffset = 210
  
    const {request, clearError, process, setProcess} = useHttp()


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=1b005fb9e66fefec2cf364198829e5a3`)
        return res.data.results.map(_transformCharacter)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=1b005fb9e66fefec2cf364198829e5a3`);
        return _transformCharacter(res.data.results[0])
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&apikey=1b005fb9e66fefec2cf364198829e5a3`);
        return res.data.results.map( _transformCharacter)
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=1b005fb9e66fefec2cf364198829e5a3`)
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=1b005fb9e66fefec2cf364198829e5a3`)
        return _transformComics(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? char.description.slice(0, 180) + '...' : 'There is no description:(',
            thumbnail: char.thumbnail.path + '.' +char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items.slice(0, 10)
        }
    }

    const _transformComics = (comic) => {
        return {
            title: comic.title,
            id: comic.id,
            price: comic.prices[0].price + '$' || 'not available',
            thumbnail: comic.thumbnail.path + '.' +comic.thumbnail.extension,
            description: comic.description || 'There is no description:(',
            pages: comic.pageCount + ' pages',
            language: comic.textObjects.language || "en-us"
        }
    }

    return { 
            process, 
            setProcess, 
            getAllCharacters, 
            getCharacter, 
            clearError, 
            getAllComics, 
            getComic, 
            getCharacterByName
        }
}