import { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.scss';
import './styles/_variables.scss'

import {MainPage, Page404, SingleComicPage} from './components/pages'  
import {AppHeader} from './components/appHeader/AppHeader'
import { SingleCharPage } from './components/pages/singleCharPage/SingleCharPage';
import { SingleItemPage } from './components/pages/SingleItemPage';

const ComicsPage = lazy(() => import('./components/pages/ComicsPage'))


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
