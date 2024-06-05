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
    SCAN_DOWNLOAD_CHECKOUT: `${prefixBase}/scan/download/checkout`,

    SAVE_CHECKIN_FORM_HAND: `${prefixBase}/scan/checkin/hand`,
    SAVE_CHECKOUT_FORM_HAND: `${prefixBase}/scan/checkout/hand`,

    DELETE_CHECKIN: `${prefixBase}/scan/delete/{:id}`,
    DELETE_CHECKOUT: `${prefixBase}/scan/delete-checkout/{:id}`,

    EDIT_CHECIN: `${prefixBase}/scan/checkin/edit`,
    EDIT_CHECOUT: `${prefixBase}/scan/checkout/edit`,
}

const banEndpoint = {
    ALL: `${prefixBase}/ban/all`,
    EDIT: `${prefixBase}/ban/edit`,
    DELETE: `${prefixBase}/ban/{:id}`,
    CREATE: `${prefixBase}/ban/`,
}
const banManagerEndpoint = {
    ALL: `${prefixBase}/manager/all`,
    ALL_BY_BANID: `${prefixBase}/manager/withBan/{:id}`,
    EDIT: `${prefixBase}/manager/edit`,
    DELETE: `${prefixBase}/manager/{:id}`,
    CREATE: `${prefixBase}/manager/`,
}

//export endpoint
export {
    authEndpoint,
    scanEndpoint,
    userEnpoint,
    banEndpoint,
    banManagerEndpoint
};