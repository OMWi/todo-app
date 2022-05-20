export class Task {
    static nextId: number = 0;
    id: number;
    title: string;
    description: string;
    priority: number;
    sectionId: number;

    constructor(title: string, description: string, priority: number, sectionId: number) {
        this.id = Task.nextId++;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.sectionId = sectionId;
        if (!title) {
            this.title = "";
        }
        if (!description) {
            this.description = "";
        }
    }   

    setId(id: number) {
        this.id = id;
        if (id > Task.nextId) {
            Task.nextId = id + 1;
        }
    }
}