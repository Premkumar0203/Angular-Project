import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private user = {
        valid: false,
        username: ""
    }

    public get name(){
        return this.user.username;
    }
    public set name(n:string){
        this.user.username = n;
    }
    
    public get valid(){
        return this.user.valid;
    }
    public set valid(flag:boolean){
        this.user.valid = flag;
    }
    
}