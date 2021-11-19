import './appBanner.scss'

import avengerslogo from '../../resources/img/Avengers_logo.png'
import avengers from '../../resources/img/Avengers.png'


export const AppBanner = () => {
    return (
        <div className="app__banner">
        <img src={avengers} alt="Avengers"/>
        <div className="app__banner-text">
            New comics every week!<br/>
            Stay tuned!
        </div>
        <img src={avengerslogo} alt="Avengers logo"/>
    </div>
    )
}