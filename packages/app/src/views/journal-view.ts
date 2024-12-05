import {
  define,
  Form,
  History,
  InputArray,
  View
} from "@calpoly/mustang"
import { css, html, LitElement} from "lit";
import {property, state} from "lit/decorators.js";
import {Journal} from "server/models";
import {Model} from "../model.ts";
import {Msg} from "../messages.ts";


class JournalViewer extends LitElement {
  @property() // I think this gets set in HTML attribute
  journalid?: string;

  render() {
    return html`
<!--      <section>-->

        <div class="textContent">
          <slot name="content"></slot>
        </div>

        <nav>
          <a href="${this.journalid}/edit" class="edit">Edit Content</a>
        </nav>
<!--      </section>-->
    `;
  }

  static styles = [
      css`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center vertically */
          align-items: center;    /* Center horizontally */
          width: 100%;            /* Take full width of the parent */
          height: 100%;           /* Take full height of the parent */
          box-sizing: border-box; /* Include padding and border in width/height */
        }

        .textContent {
          min-width: 50vw;/* Fixed width relative to the parent */
          max-width: 50vw;        
          min-height: 50vh;
          max-height: 50vh;
          background-color: var(--body-foreground-color);
          border-radius: var(--rounded-corners-regular);
          margin-bottom: var(--margin-standard);
          padding: var(--padding-standard);

          transition: var(--transition-regular);
      
          
        }
        
        .textContent:hover
        {
          scale: var(--animated-scale-small);
        }



        .edit {
          color: var(--color-text-default);
          font-weight: bold;
          text-decoration: none;
          padding: var(--padding-standard);
          border-radius: var(--rounded-corners-regular);
          background-color: var(--interactive-element-color);
          
        }
        
        nav
        {
          transition: var(--transition-regular);
        }
        
        nav:hover {
          scale: var(--animated-scale);
        }
      `
  ]

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
            <textarea name="content" class="textContent" placeholder="Sample text">

              </textarea>
          </label>
          
        </mu-form>
      </section>
    `;
  }

  static styles = [
    css`
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center vertically */
          align-items: center;    /* Center horizontally */
          width: 100%;            /* Take full width of the parent */
          height: 100%;           /* Take full height of the parent */
          box-sizing: border-box; /* Include padding and border in width/height */
        }

        .textContent {
          min-width: 50vw;/* Fixed width relative to the parent */
          max-width: 50vw;        
          min-height: 50vh;
          max-height: 50vh;
          background-color: var(--body-foreground-color);
          border-radius: var(--rounded-corners-regular);
          margin-bottom: var(--margin-standard);
          padding: var(--padding-standard);
          transition: var(--transition-regular);
          font-size: medium;
          color: var(--color-text-default);
          border-width: 0;

          
        }
        
        .textContent:hover
        {
          scale: var(--animated-scale-small);
        }



        .edit {
          color: var(--color-text-default);
          font-weight: bold;
          text-decoration: none;
          padding: var(--padding-standard);
          border-radius: var(--rounded-corners-regular);
          background-color: var(--interactive-element-color);
          
        }
        
        nav
        {
          transition: var(--transition-regular);
        }
        
        nav:hover {
          scale: var(--animated-scale);
        }
      `
  ]

}

export class JournalViewElement extends View<Model, Msg> {
  static uses = define({
    "journal-viewer": JournalViewer,
    "journal-editor": JournalEditor,
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property({ attribute: "journal-id", reflect: true })
  journalid = "";

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

      this.dispatchMessage([
        "journal/select",
        { journalid: newValue }
      ]);
    }


  }

  render() {

    const { _id, content } = this.journal || {};

    console.log("Journal has ID: ", _id);
    console.log("Journal has structure: ", this.journal);



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
          <journal-viewer class="journalView" journalid=${_id}>
            <span slot="content">${content}</span>
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

  static styles = css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%; /* Fills the entire viewport height */
    margin-bottom: 10%;


  }

`;


}
