export class Report {
    constructor() {
        this.notes = new Array();
    }

    addNote(step, note) {
        this.notes.push({
            id: this.notes.length+1,
            step: step,
            note: note,
            created: new Date().getDate
        });
    }

    removeNote() {

    }

    displayNotes() {
        return this.notes
            .sort((a,b) => (a.step > b.step) ? 1 : ((b.step > a.step) ? -1 : 0))
            .map(e => e.note)
            .join("");
    }

    addMeasurement() {

    }

    removeMeasurement() {

    }
    
}