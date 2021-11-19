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
// export const SearchCharForm = () => {
//     const [char, setChar] = useState(null)
//     const {getCharacterByName, loading, error, clearError} = useMarvelService()

//     const charLoaded = (char) => {
//         setChar(char)
//     }
//     const updateChar = (name) => {
//         clearError()
//         getCharacterByName(name)
//         .then(res => charLoaded(res))
//     }
//     console.log(char)
    
//     const LinkToCharPage = () => {
//         return (
//             <div className="char__search-wrapper">
//             <div className="char__search-success">There is! Visit {char[0].name} page?</div>
//             <Link to={`/characters/${char[0].id}`} className="button button__secondary">
//                 <div className="inner">To page</div>
//             </Link>
//             </div>
//         )
//     } 
//     const CharNotFound = () => {
//         return(
//             <div className="char__search-error">
//                 The character was not found. Check the name and try again
//             </div>
//         )
//     }
//     const searchResult = !char ? null : char.length > 0 ? <LinkToCharPage/> : <CharNotFound/>
//     const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null
//     const content = !error ? <View loading={loading} updateChar={updateChar} searchResult={searchResult} /> : null
//     return (
//         <>
//         {content}
//         {errorMessage}
//         </>
//     )
// }

// const View = (props) => {
//     // const {values} = useFormik()
//     return (
//         <div className="char__search-form">
//         <Formik
//         initialValues={{name: '' }}
//         validationSchema = {Yup.object({
//             name: Yup.string().required('This field is required')
//         })}
//         onSubmit = { ({name}) => {
//             props.updateChar(name);
//         }}
//         >
//         <Form>
//         <label className="char__search-label"  htmlFor='charname'>Or find a character by name:</label>
//         <div className="char__search-wrapper">
//          <Field name="name" type="text"  placeholder='Enter name' />
//          <button 
//             className="button button__main"
//             disabled={props.loading}>
//             <div className="inner">find</div>
//         </button>
//         </div>
//         <FormikErrorMessage name="name" component="div" className="char__search-error"/>
//        </Form>
//         </Formik>
//         {/* {props.searchResult} */}
    
//         {/* {values.name ? props.searchResult : null} */}
//         </div>
//         // <div className="char__search-form">
//         //     <form onSubmit={props.loadChar}>
//         //         <label className="char__search-label"  htmlFor='charname'>Or find a character by name:</label>
//         //         <div className="char__search-wrapper">
//         //         <input 
//         //             id='charName'
//         //             placeholder='Enter name'
//         //             value={props.charName}
//         //             onChange={(e) => props.setCharName(e.target.value)}>
//         //         </input>
//         //         <button 
//         //             className="button button__main"
//         //             disabled={props.loading}>
//         //             <div className="inner">find</div>
//         //         </button>
//         //         </div>
//         //     </form>
//         // </div>
//     )
// }

// export const SearchCharForm = () => {
//     const [char, setChar] = useState(null);
//     const {loading, error, getCharacterByName, clearError} = useMarvelService();

//     const onCharLoaded = (char) => {
//         setChar(char);
//     }

//     const updateChar = (name) => {
//         clearError();

//         getCharacterByName(name)
//             .then(onCharLoaded);
//     }

//     const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
//     const results = !char ? null : char.length > 0 ?
//                     <div className="char__search-wrapper">
//                         <div className="char__search-success">There is! Visit {char[0].name} page?</div>
//                         <Link to={`/characters/${char[0].id}`} className="button button__secondary">
//                             <div className="inner">To page</div>
//                         </Link>
//                     </div> : 
//                     <div className="char__search-error">
//                         The character was not found. Check the name and try again
//                     </div>;

//     return (
//         <div className="char__search-form">
//             <Formik
//                 initialValues = {{
//                     charName: ''
//                 }}
//                 validationSchema = {Yup.object({
//                     charName: Yup.string().required('This field is required')
//                 })}
//                 onSubmit = { ({charName}) => {
//                     updateChar(charName);
//                 }}
//             >
//                 <Form>
//                     <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
//                     <div className="char__search-wrapper">
//                         <Field 
//                             id="charName" 
//                             name='charName' 
//                             type='text' 
//                             placeholder="Enter name"/>
//                         <button 
//                             type='submit' 
//                             className="button button__main"
//                             disabled={loading}>
//                             <div className="inner">find</div>
//                         </button>
//                     </div>
//                     <FormikErrorMessage component="div" className="char__search-error" name="charName" />
//                 </Form>
//             </Formik>
//             {results}
//             {errorMessage}
//         </div>
//     )
// }