import { Section } from "./section.js";

export class Project {
    static nextId = 0;

    constructor(name) {
        this.id = Project.nextId++;
        this.name = name;
        this.count = 0;
        this.sections = [];
    }

    addSection(section) {
        this.sections.push(section);
        this.count += section.count;
    }

    updateCount() {
        let count = 0;
        for (let i = 0; i < this.sections.length; i++) {
            count += this.sections[i].count;
        }
        this.count = count;
    }

    deleteSection(sectionId) {
        this.sections = this.sections.filter(function(value, index, arr) {
            return value.id != sectionId;
        });
        this.count = this.getCount();
    }

    getSection(sectionId) {
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                return this.sections[i];
            }
        }
    }

    updateSection(sectionId, section) {
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.sections[i] = section;
                break;
            }
        }
    }
}