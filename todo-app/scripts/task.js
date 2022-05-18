export class Task {
    static nextId = 0;

    constructor(title, description, priority) {
        this.id = Task.nextId++;
        this.title = title;
        this.description = description;
        this.priority = priority;
    }   
}