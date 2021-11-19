import { NavLink , Link} from 'react-router-dom'
import './appHeader.scss'


export const AppHeader = () => {
    return (
        <>
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> 
                    information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink 
                        to='/'
                        style={({ isActive }) => {
                            return {
                              color: isActive ? "#9F0013" : ""
                        }}}>Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink 
                            to='/comics'
                            style={({ isActive }) => {
                                return {
                                  color: isActive ? "#9F0013" : ""
                            }}}>Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}