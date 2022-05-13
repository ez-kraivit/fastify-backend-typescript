import * as bcrypt from 'bcryptjs';
export default class Bcrypts {
    static saltRounds = bcrypt.genSaltSync(14);

    static genPasswordArray(data:{[key:string]:any}){
        return Promise.all(data.map(async(item:{password:string})=>{
            item.password = await Bcrypts.genPassword(item.password)                         
            return item
        }))
    }

    static genPassword<T>(text:string):Promise<T> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(text, Bcrypts.saltRounds, (err:Error, hash:any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    }
    
    static checkPassword(hashtext:string,plaintext:string):Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plaintext, hashtext, (err:Error, res:any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
    
}