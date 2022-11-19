export class Role {
    id:number = 0;
    name:string = "";
    description:string = "";

    constructor(id: number, name: string, description: string) {}

    public get roleName():string{
        return this.name;
    }
}

