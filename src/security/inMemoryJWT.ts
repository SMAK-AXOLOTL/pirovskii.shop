import {authApi} from "../api/authApi";

const inMemoryJWTManager = () => {
    let inMemoryJWT: string | null = null;
    let inMemoryRefreshToken: string | null = null;
    let refreshTimeOutId: number;


    // This listener allows to disconnect another session of react-admin started in another tab
    window.addEventListener('storage', (event) => {
        if (event.key === 'logout') {
            inMemoryJWT = null;
        }
    });

    // This countdown feature is used to renew the JWT in a way that is transparent to the user.
    // before it's no longer valid
    const refreshTokenIn = (delay: number) => {
        refreshTimeOutId = window.setTimeout(
            getRefreshedToken,
            delay * 1000 - 5000
        ); // Validity period of the token in seconds, minus 5 seconds
    };

    const abordRefreshToken = () => {
        if (refreshTimeOutId) {
            window.clearTimeout(refreshTimeOutId);
        }
    };

    // The method makes a call to the refresh-token endpoint
    // If there is a valid cookie, the endpoint will return a fresh jwt.
    const getRefreshedToken = async () => {
        await authApi.refresh()
    };


    const getToken = () => inMemoryJWT;

    const setToken = (accessToken: string, refreshToken: string, delay: number) => {
        inMemoryJWT = accessToken;
        inMemoryRefreshToken = refreshToken
        refreshTokenIn(delay);
        return true;
    };

    const eraseToken = () => {
        inMemoryJWT = null;
        abordRefreshToken();
        window.localStorage.setItem('logout', Date.now().toString());
        return true;
    }

    const getRefreshToken = () => inMemoryRefreshToken

    return {
        eraseToken: eraseToken,
        getToken,
        setToken,
        getRefreshToken
    }
};

export default inMemoryJWTManager();