import { Task } from "./task.js"

export class Section {
    static nextId = 0;

    constructor(name) {
        this.id = Section.nextId++;
        this.name = name;
        this.count = 0;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.count++;
    }

    deleteTask(id) {
        let oldSize = this.tasks.length;
        this.tasks = this.tasks.filter(function(value, index, arr){
            return value.id !== id;
        });
        this.count -= oldSize - this.tasks.length;
    }

    getTask(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === id) {
                return this.tasks[i];
            }
        }
    }

    updateTask(id, title, description, priority) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === id) {
                this.notes[i].title = title;
                this.notes[i].description = description;
                this.notes[i].priority = priority;
                break;
            }
        }
    }

}