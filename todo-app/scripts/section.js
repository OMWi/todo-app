import { Task } from "./task.js"

export class Section {
    constructor() {
        this.tasks = [];
    }

    add(task) {
        this.tasks.push(task);
    }

    delete(id) {
        this.tasks = this.tasks.filter(function(value, index, arr){
            return value.id !== id;
        });
    }

    get(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === id) {
                return this.tasks[i];
            }
        }
    }

    update(id, title, description, priority) {
        // console.log(id);
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