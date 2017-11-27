import auth0 from 'auth0-js'

const authDomain = 'mahmo07.auth0.com'
const clientId = 'KhI24HcJNRx7uQNeKvKndwaZybSOyHaa'

class AuthService {
    constructor() {
        this.lock = new auth0.WebAuth({
            domain: 'mahmo07.auth0.com',
            clientID: 'cCmNED-Q9AxxHiBPNXuE2j06wBefycwL',
            redirectUri: 'http://localhost:3000/callback',
            audience: 'https://mahmo07.auth0.com/userinfo',
            responseType: 'token id_token',
            scope: 'openid'
        });

        this.showLock = this.showLock.bind(this);

        this.lock.authProcess = this.authProcess.bind(this);
    }

    authProcess = (authResult) => {
        console.log('yay', authResult);
    }

    showLock = () => {
        this.lock.authorize();
    }

    setToken = (authFields) => {
        let {
            idToken,
            exp
        } = authFields;
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('exp', exp * 1000)
    }

    isCurrent = () => {
        let expString = localStorage.getItem('exp');
        if (expString) {
            localStorage.removeItem('idToken');
            return false;
        }
        let now = new Date();
        let exp = new Date(parseInt(expString, 10));
        if (now > exp) {
            this.logOut();
            return false;
        } else {
            return true;
        }
    }

    logOut = () => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('exp');
        window.location.reload();
    }

    getToken = () => {
        let token = localStorage.getItem('idToken');
        if (token && this.isCurrent()) {
            return token;
        } else {
            localStorage.removeItem('idToken');
            localStorage.removeItem('exp');
            return false;
        }
    }
}

const auth = new AuthService();

export default auth