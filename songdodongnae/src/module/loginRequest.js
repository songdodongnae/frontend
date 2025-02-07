import loginUrls from '../config/loginUrls.json'

export const loginRequest = async (url) => {
    fetch(loginUrls['login-base']+loginUrls[url], {
        credentials: 'include'
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.error('@@@ fetch 오류:', error);
        })

};