import { Link } from "react-router-dom";
import { ErrorMessage } from "../errorMessage/errorMessage";


const Page404 = () => {
    return(
        <div>
            <ErrorMessage/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22}}>Page does not exist</p>
            <Link to='/' style={{textAlign: 'center', display: 'block', fontWeight: 'bold', fontSize: 22, color: '#9F0013', marginTop: 15}}>Back to main page</Link>
        </div>
    )
}

export default Page404