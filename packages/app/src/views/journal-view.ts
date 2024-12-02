import {
  define,
  Form,
  History,
  InputArray,
  View
} from "@calpoly/mustang"
import { html, LitElement} from "lit";
import {property, state} from "lit/decorators.js";
import {Journal} from "server/models";
import {Model} from "../model.ts";
import {Msg} from "../messages.ts";

class JournalViewer extends LitElement {
  @property() // I think this gets set in HTML attribute
  journalid?: string;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a href="${this.journalid}/edit" class="edit">Edit</a>
        </nav>
        <slot name="journalcontent"></slot>
      </section>
    `;
  }

}

class JournalEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });


  @property({ attribute: false })
  init?: Journal;

  render() {
    return html`
      <section>
        <mu-form .init=${this.init}>
          <label>
            <textarea name="content" placeholder="Sample text">
 
              </textarea>
          </label>
        </mu-form>
      </section>
    `;
  }

}

export class JournalViewElement extends View<Model, Msg> {
  static uses = define({
    "journal-viewer": JournalViewer,
    "journal-editor": JournalEditor,
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property({ attribute: "journal-id", reflect: true })
  userid = "";

  @state()
  get journal(): Journal | undefined {
    return this.model.journal;
  }


  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "journal-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Journaler Page:", newValue);
      this.dispatchMessage([
        "profile/select",
        { userid: newValue }
      ]);
    }
  }

  render() {

    // const {entries} = this.journal || {};



    return this.edit
      ? html`
          <journal-editor
       
            .init=${this.journal}
            @mu-form:submit=${(
        event: Form.SubmitEvent<Journal>
      ) => this._handleSubmit(event)}>
           
          </journal-editor>
        `
      : html`
          <journal-viewer journalid="adminJournal">
            <span>Hey</span>
          </journal-viewer>
        `;
  }

  _handleSubmit(event: Form.SubmitEvent<Journal>) {
    console.log("Handling submit of mu-form");
    const journalid ="674e171fcdfafa1eeb94c694"

    this.dispatchMessage([
      "journal/save",
      {
        journalid: journalid,
        content: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/journals/`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }

}
