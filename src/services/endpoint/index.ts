//edit prefixBase here
const prefixBase:string = '/api/v1';

const authEndpoint = {
    SIGN_IN: `${prefixBase}/auth/login`,
}

const scanEndpoint = {
    ALL_ON_USER: ``,
    ALL: `${prefixBase}/scan/all`,
    SCAN: `${prefixBase}/scan`
}
//export endpoint
export {
    authEndpoint,
    scanEndpoint
};