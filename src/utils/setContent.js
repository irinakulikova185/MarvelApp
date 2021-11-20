import { Skeleton } from '../components/skeleton/Skeleton'
import { Spinner } from '../components/spinner/Spinner'
import { ErrorMessage } from '../components/errorMessage/errorMessage'


export const setContent = (process, Component, data) => {
    switch(process) {
        case 'loading': 
            return <Spinner/>;
        case 'waiting': 
            return <Skeleton/>;
        case 'confirmed':
            return <Component data={data}/> 
        case 'error':
            return <ErrorMessage/>     
        default:
            throw new Error('Unexcected process type')    
    }
}