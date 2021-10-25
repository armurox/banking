import UserContext from "../helpers/UserContext";
import UserDBContext from "../helpers/UserDBContext";
import LanguageContext from '../helpers/LanguageContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserLogin.css';
import languages from '../data/languages';

function UserLogin() {

    const { users } = useContext(UserDBContext);

    const { loggedInUser, logOut } = useContext(UserContext);

    // Get language context and set language data
    const { language, changeLanguage } = useContext(LanguageContext);
    const data = languages[language];
    const { signOut, signIn } = data.general;

    const getUser = (users, loggedInUser) => {
        return users.filter(x=>x.number === loggedInUser)[0];
    }

    const handleSignOut = () => {
        if (loggedInUser !== '') {
            logOut();
        }
    }
 
    const handleChange = e => {
        const selectBox = document.getElementById("language-toggler");
        const selectedValue = selectBox.options[selectBox.selectedIndex].value;
        if (language !== selectedValue) {changeLanguage(selectedValue)}
    }

    return (
        <div style={{padding:'10px',fontSize:"0.8rem", height: 'auto', margin:'auto 0px', display:'flex',flexWrap:'nowrap',alignItems:'center'}}>
            {(loggedInUser !== '') ? <div className="login-name">{getUser(users, loggedInUser).name}</div> : null}
            <div className='login-link' onClick={loggedInUser !== '' ? handleSignOut : null}>{loggedInUser !== '' ? signOut : users.length > 0 ? <Link style={{textDecoration:'none',color:'black', fontSize:'inherit'}} to="/">{signIn}</Link>: null}
            </div>
            <div className="language-toggle-container">
                <select id="language-toggler"  className="language-toggle" defaultValue={language} onChange={handleChange} tabIndex="0">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
            </div>
        </div>
    )
}

export default UserLogin;