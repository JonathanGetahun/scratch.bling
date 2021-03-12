const authProvider = {
    login: ({ username, password }) =>  {
        const request = new Request('http://localhost:4000/api/v1/users/auth', {
            method: 'post',
            mode: "cors",
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                
                return response.text();
            })
            .then(auth => {
                localStorage.setItem('auth', auth);
            })
            .catch((err) => {
                throw new Error('Network error')
            });
    },
   logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401) {
            localStorage.removeItem('auth');
            return Promise.reject();
        } 
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('auth')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
 };

 export default authProvider;