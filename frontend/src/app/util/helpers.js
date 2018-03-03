import shortid from "shortid";

export const arrayToObject = array => {
    const objects = {};
    // Set object
    array.map(obj => (objects[obj.id] = obj));
    // Return object
    return objects;
}

export const generateId = () => {
    return `${shortid.generate()}-${shortid.generate()}`;
}