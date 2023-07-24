import {icons} from "@ckeditor/ckeditor5-core";
import {ButtonView, createLabeledInputText, LabeledFieldView, submitHandler, View} from "@ckeditor/ckeditor5-ui";
import {apiFontAwesome6Search} from "./api/fa6API";

export default class fontAwesome6View extends View {
  constructor(locale, searchResultButtons = []) {
    super(locale);

    console.log(searchResultButtons);

    this.searchResultButtons = searchResultButtons;

    this.searchInputView = this._createSearchInput();

    this.saveButtonView = this._createButton('Save', icons.check, 'ck-button-save')
    this.saveButtonView.type = 'submit'

    this.cancelButtonView = this._createButton('Cancel', icons.cancel, 'ck-button-save')
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection([
      this.searchInputView,
      ...this.searchResultButtons,
      this.saveButtonView,
      this.cancelButtonView,
    ])

    this.setTemplate({
      tag: 'form',
      attributes: {
        class: ['ck', 'ck-fontawesome-form'],
        tabindex: '-1'
      },
      children: this.childViews
    })
  }


  render() {
    super.render();

    submitHandler({
      view: this
    })
  }

  destroy() {
    super.destroy();
  }

  _createButton(label, icon, className) {
    const button = new ButtonView();

    button.set({
      label,
      icon,
      tooltip: true,
      class: className
    })

    return button;
  }

  _createSearchInput() {
    const labeledInput = new LabeledFieldView(this.locale, createLabeledInputText);

    labeledInput.label = "Search";

    return labeledInput;
  }
}
