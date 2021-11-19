import errorImg from './error.gif'

import './errorMessage.scss'

export const ErrorMessage = () => {
    return (
        <img src={errorImg} alt='Error' className='errorMessage'/>
    )
}