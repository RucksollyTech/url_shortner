
const GenerateRandomKeys = ():string => {
    let r = (Math.random() + 1).toString(36).substring(8);
    return r
}

export default GenerateRandomKeys






