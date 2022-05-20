export class Section {
    static nextId: number = 0;
    id: number;
    name: string;
    projectId: number;

    constructor(name: string, projectId: number) {
        this.id = Section.nextId++;
        this.name = name;
        this.projectId = projectId;
        if (!name) {
            this.name = "";
        }
    }

    setId(id: number) {
        this.id = id;
        if (id > Section.nextId) {
            Section.nextId = id + 1;
        }
    }
}