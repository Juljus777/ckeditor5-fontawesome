import {Plugin} from "@ckeditor/ckeditor5-core";
import {ButtonView, clickOutsideHandler, ContextualBalloon} from "@ckeditor/ckeditor5-ui";
import uiView from "./views/uiView";
import './styles.css';
import {apiFontAwesome6Search} from "./api/fa6API";

export default class fontAwesome6UI extends Plugin {
  static get requires() {
    return [ContextualBalloon]
  }

  async init() {
    const editor = this.editor;

    this._balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = await this._createFormView();

    editor.ui.componentFactory.add('fontawesome6', () => {
      const button = new ButtonView();

      button.label = 'FontAwesome';
      button.tooltip = true;
      button.withText = true;

      this.listenTo(button, 'execute', () => {
        this._showUI();
      })

      return button;
    })
  }

  async _createFormView() {
    const editor = this.editor;
    const buttonInputs = await this._createIconInputs();
    const formView = new uiView(editor.locale, buttonInputs);

    this.listenTo(formView, 'submit', () => {
      this._hideUI();
    })

    this.listenTo(formView, 'cancel', () => {
      this._hideUI();
    })

    return formView;
  }

  _hideUI() {
    this._balloon.remove(this.formView);
    this.editor.editing.view.focus();
  }

  _showUI() {
    const selection = this.editor.model.document.selection;

    this._balloon.add({
      view: this.formView,
    })

    this.formView.focus();
  }

  async _createIconInputs() {
    const inputs = [];

    // const {search} = await apiFontAwesome6Search({
    //     query: 'house',
    //     membership: this.editor.config._config.fontAwesome6.membership,
    // })

    const {search} = {
      "search": [
        {
          "id": "house",
          "membership": {
            "free": [
              "solid"
            ]
          }
        },
        {
          "id": "house-window",
          "membership": {
            "free": []
          }
        },
        {
          "id": "house-user",
          "membership": {
            "free": [
              "solid"
            ]
          }
        },
        {
          "id": "house-turret",
          "membership": {
            "free": []
          }
        },
        {
          "id": "house-tree",
          "membership": {
            "free": []
          }
        }
      ]
    }

    let searchItems = search;

    if (this.editor.config._config.fontAwesome6.membership === 'free') {
        searchItems = searchItems.filter(data => data.membership.free.length > 0);
        if (searchItems.length === 0) {
            // Call something here that creates the error message
            // - Icon does not exist for free members
            // - There are no matches for the current search
        }
    }

    searchItems.forEach(item => {
      const button = new ButtonView();
      button.label = item.id;
      button.class = `fa fa-${item.id}`;
      inputs.push(button);
    });

    return inputs;
  }
}
