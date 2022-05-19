import { Section } from "./section";

export class Project {
    static nextId: number = 0;
    id: number;
    name: string;
    sections: Section[];

    constructor(name: string) {
        this.id = Project.nextId++;
        this.name = name;
        this.sections = [];
    }

    addSection(section: Section) {
        this.sections.push(section);
    }

    deleteSection(sectionId: number) {
        this.sections = this.sections.filter(function(value, index, arr) {
            return value.id != sectionId;
        });
    }

    getSection(sectionId: number): Section | undefined {
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                return this.sections[i];
            }
        }
        return undefined;
    }

    updateSection(sectionId: number, section: Section) {
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id == sectionId) {
                this.sections[i] = section;
                break;
            }
        }
    }
}