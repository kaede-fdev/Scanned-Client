//edit prefixBase here
const prefixBase:string = '/api/v1';

const authEndpoint = {
    SIGN_IN: `${prefixBase}/auth/login`,
    VERIFY: `${prefixBase}/auth/verify`
}

const userEnpoint = {
    ALL : `${prefixBase}/user/all`,
    CREATE_NEW: `${prefixBase}/user/create`,
    FIND_BY_ID: `${prefixBase}/user/{:id}`,
    DELETE_BY_ID: `${prefixBase}/user/{:id}`,
    EDIT_USER: `${prefixBase}/user/edit`
}

const scanEndpoint = {
    ALL_ON_USER: ``,
    ALL: `${prefixBase}/scan/all`,
    SCAN: `${prefixBase}/scan`
}

//export endpoint
export {
    authEndpoint,
    scanEndpoint,
    userEnpoint
};