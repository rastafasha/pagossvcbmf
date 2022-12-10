export class Role {
    id:number = 0;
    name:string = "";
    description:string = "";
    permissions: Permission[];

    constructor(id: number, name: string, description: string) {}

    public get roleName():string{
        return this.name;
    }
}





export class Permission {
  id: number;
  name: string;
  description: string;
  pivot: Pivot;
}

interface Pivot {
  role_id: number;
  permission_id: number;
}
