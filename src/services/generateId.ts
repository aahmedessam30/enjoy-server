
function genUniqueId(): string {
    return Math.floor(new Date().valueOf() * Math.random())?.toString();
}

export default genUniqueId;