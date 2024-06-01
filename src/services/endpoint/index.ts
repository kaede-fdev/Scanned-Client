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
    ALL_CHECKIN: `${prefixBase}/scan/all/checkin`,
    ALL_CHECKOUT: `${prefixBase}/scan/all/checkout`,
    SCAN_CHECKIN: `${prefixBase}/scan/checkin`,
    SCAN_CHECKOUT: `${prefixBase}/scan/checkout`,
    SCAN_CHECKIN_LONG: `${prefixBase}/scan/checkin-long`,
    SCAN_CHECKOUT_LONG: `${prefixBase}/scan/checkout-long`,
    SCAN_DOWNLOAD_CHECKIN: `${prefixBase}/scan/download/checkin`,
    SCAN_DOWNLOAD_CHECKOUT: `${prefixBase}/scan/download/checkout`
}

//export endpoint
export {
    authEndpoint,
    scanEndpoint,
    userEnpoint
};