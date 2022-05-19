import { Task } from "./task";

export class Section {
    static nextId: number = 0;
    id: number;
    name: string;
    tasks: Task[];

    constructor(name: string) {
        this.id = Section.nextId++;
        this.name = name;
        this.tasks = [];
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter(function(value, index, arr){
            return value.id != id;
        });
    }

    getTask(id: number): Task | undefined {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
                return this.tasks[i];
            }
        }
        return undefined;   
    }

    updateTask(id: null, title: string, description: string, priority: number) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
                this.tasks[i].title = title;
                this.tasks[i].description = description;
                this.tasks[i].priority = priority;
                break;
            }
        }
    }
}