export class teacher{

    firstName!: string;
    lastName!: string;
    phoneNumber!: string;
    module!: string;
    password!: string;
    activated: boolean = false;

    teacher(){}

    teacherSave(fn:string,ln:string,pn:string,md:string,ps:string){
        this.firstName=fn;
        this.lastName=ln;
        this.phoneNumber=pn;
        this.module=md;
        this.password=ps;
    }
}
