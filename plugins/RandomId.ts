const _base10:string = '0123456789'
const _base62:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const _base36:string = 'abcdefghijklmnopqrstuvwxyz0123456789'

export default class RandomId {
    static chars:string
    static numbers: number
    
    static randomid = (length:number):string => {
        RandomId.numbers = RandomId.numbers || 10
        let salt = '',i = 0
        while(i <RandomId.numbers){salt += RandomId.chars[Math.floor(length * Math.random())]; i++;}
        return salt
    }

    static generateid = (options:string, numbers:number):string => {
        if (typeof options != "string" || typeof numbers === "string" || typeof numbers === "object" || typeof numbers === "undefined" || Array.isArray(numbers) === true) { return "Error Number" }
        else {
            switch (String(options)) {
                case "base62":
                    RandomId.chars = _base62
                    break;
                case "base36":
                    RandomId.chars = _base36
                    break;
                case "base10":
                    RandomId.chars = _base10
                    break;
                default:
                    return "Options : base10 base36 base10";
            }
            let length = Buffer.byteLength(RandomId.chars)
            RandomId.numbers = numbers
            return RandomId.randomid(length)
        }
    }
}