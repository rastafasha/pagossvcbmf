import { FormControl } from "@angular/forms";

export interface ILoginForm {
    username: FormControl;
    password: FormControl;
    remember: FormControl;

    login():void
    amIRemembered():boolean;
    retrieveMe():void;
    rememberMe():void;
}
