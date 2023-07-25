import {icons} from "@ckeditor/ckeditor5-core";
import {ButtonView, createLabeledInputText, LabeledFieldView, submitHandler, View} from "@ckeditor/ckeditor5-ui";
import searchResultsView from '../views/searchResultsView';

export default class uiView extends View {
  constructor(locale, searchResultButtons = []) {
    super(locale);

    this.searchResultButtons = searchResultButtons;

    this.searchInputView = this._createSearchInput();

    this.saveButtonView = this._createButton('Save', icons.check, 'ck-button-save')
    this.saveButtonView.type = 'submit'

    this.cancelButtonView = this._createButton('Cancel', icons.cancel, 'ck-button-cancel')
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.resultContainer = new searchResultsView(locale, this.searchResultButtons);

    this.formActions = new View(locale);
    this.formActions.setTemplate({
      tag: 'div',
      attributes: {
        class: ['ck', 'ck-fontawesome-form-actions'],
      },
      children: this.createCollection([
        this.saveButtonView,
        this.cancelButtonView
      ])
    })


    this.childViews = this.createCollection([
      this.searchInputView,
      this.resultContainer,
      this.formActions,
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
