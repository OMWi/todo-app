export class Project {
    static nextId: number = 0;
    id: number;
    name: string;

    constructor(name: string) {
        this.id = Project.nextId++;
        this.name = name;
        if (!name) {
            this.name = "";
        }
    }
    
    setId(id: number) {
        this.id = id;
        if (id > Project.nextId) {
            Project.nextId = id + 1;
        }
    }
}