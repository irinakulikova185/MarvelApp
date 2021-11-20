import { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.scss';
import './styles/_variables.scss'

import MainPage from './components/pages/MainPage'  
import {AppHeader} from './components/appHeader/AppHeader'

const ComicsPage = lazy(() => import('./components/pages/ComicsPage'))
const SingleItemPage = lazy(() => import('./components/pages/SingleItemPage'))
const SingleCharPage = lazy(() => import('./components/pages/singleCharPage/SingleCharPage'))
const SingleComicPage = lazy(() => import('./components/pages/singleComicPage/SingleComicPage'))
const Page404 = lazy(() => import('./components/pages/404'))




const App = () => {
  return (
    <Router>
      <div className="app">
      <AppHeader/>
      <main>
        <Suspense fallback={<span>Loading...</span>}>
          <Routes>
          <Route path='/' element={<MainPage/>}/>
            <Route path='characters/:id' element={<SingleItemPage Component={SingleCharPage} data='char'/>}/>
            <Route path='comics' element={<ComicsPage/>}/>
            <Route path='comics/:id' element={<SingleItemPage Component={SingleComicPage} data='comic'/>}/>  
            <Route path='*' element={<Page404/>}/>
          </Routes>
        </Suspense>
      </main>
    </div>
    </Router>
  );
}

export default App;
