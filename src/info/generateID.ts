function generateID() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
}

export default generateID;