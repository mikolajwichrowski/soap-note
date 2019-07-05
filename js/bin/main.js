import { slkt, slktl, init } from '../utils/selector.js';
import { keywordList } from '../bin/keywordList.js';
import { Keyword } from '../entities/Keyword.js';
import { Report } from '../entities/Report.js';

init();

export class Main {
    constructor() {
        this.report = new Report();
        this.last_state = 1;

        slkt(`#textarea-soap`)
            .evnt(`focus`, this.show_info)
            .evnt(`keyup`, this.check_after(
                this.focus_button
            ));

        slkt(`#info`).evnt(`click`, this.hide_info);

        slkt(`#button-s`).evnt(`click`, this.focus_button(`button-s`));
        
        slkt(`#button-o`).evnt(`click`, this.focus_button(`button-o`));
        
        slkt(`#button-a`).evnt(`click`, this.focus_button(`button-a`));

        slkt(`#button-p`).evnt(`click`, this.focus_button(`button-p`));

        slkt(`#button-e`)
            .evnt(`click`, this.focus_button(`button-e`))
            .evnt(`click`, this.finish);
    }

    show_info() {
        slkt(`#info`)
            .show();
    }

    hide_info() {
        slkt(`#info`)
            .hide();
    }

    focus_button(id) {
        return () => {
            const change_button = (element, index) => {
                element.filled_outline()
                this.last_state = index+1;
            }

            const state_to_name = (state) => {
                switch (state) {
                    case 1:
                        return "Subjective";
                    case 2:
                        return "Objective";
                    case 3:
                        return "Assessment";
                    case 4:
                        return "Plan";
                    default:
                        return "";
                }
            }

            slktl(`.selectors > div > .button`)
                .before(() => {
                    const set_text = () => {
                        const text = slkt(`#textarea-soap`).value.split(' ').map(w => {
                            return keywordList.indexOf(w) > -1 ? new Keyword(w).display() : w;
                        }).join(' ');

                        let note = `
                        <div class="card">
                            <h4>${ state_to_name(this.last_state) }</h4> ${ text }
                        </div>
                        `;

                        this.report.addNote(this.last_state, note);

                        slkt(`#result-soap`).innerHTML = this.report.displayNotes();
                        slkt(`#textarea-soap`).value = ``;
                    }
                    
                    slkt(`#${id}`).classList.contains("button-outline") ? set_text() : null;
                })
                .forEach((element, index) => element.id != id && id != "#button-e" ? 
                    element.empty_outline() : 
                    change_button(element, index)
                );
        }
    }

    check_after(focus_button) {
        return () => { 
            const question = () => confirm(`Ben je klaar met dit onderdeel?`);
            const text = slkt(`#textarea-soap`).value.split(` `);
            text.length == 20 ? 
                (question() ? 
                    focus_button(`button-s`)() : 
                    null) : 
                null;
        }
    }

    finish() {
        slktl(`.selectors > div > .button`)
            .forEach((element) => element.filled_outline());
    }
}