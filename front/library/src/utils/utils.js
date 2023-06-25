import SERVER from "../actions/server";

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function isStringEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

export function getBase64(file, cb) {
    let reader = new FileReader();
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    reader.readAsDataURL(file);
}