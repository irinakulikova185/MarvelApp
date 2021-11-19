
import {useState } from 'react';
import {Helmet} from "react-helmet";


import {RandomChar} from '../randomChar/RandomChar'
import {CharList} from '../charList/CharList'
import {CharInfo} from '../charInfo/CharInfo'
import { ErrorBoundary } from '../errorBoundary/ErrorBoundary';
import { SearchCharForm } from '../searchCharForm/SearchCharForm';

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null)
  const onCharSelected = (id) => {
    setSelectedChar(id)
  }
  return (
    <>
    <Helmet>
      <meta
        name="description"
        content="Marvel portal"
      />
      <title>Marvel portal</title>
    </Helmet>
    <RandomChar/> 
    <div className='char__content'>
       <ErrorBoundary>
          <CharList onCharSelected={id => onCharSelected(id)}/>
       </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
          <ErrorBoundary>
            <SearchCharForm/>
          </ErrorBoundary>
        </div>
    </div> 
    </>
  )
}

export default MainPage