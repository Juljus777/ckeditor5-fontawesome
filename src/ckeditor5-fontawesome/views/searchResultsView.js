import {ButtonView, createLabeledInputText, LabeledFieldView, submitHandler, View} from "@ckeditor/ckeditor5-ui";

export default class SearchResultsView extends View {
  constructor(locale, searchResultButtons) {
    super(locale);

    this.childViews = this.createCollection([
      ...searchResultButtons,
    ]);

    this.setTemplate({
      tag: 'div',
      attributes: {
        class: ['ck', 'ck-fontawesome-results'],
        tabindex: '-1'
      },
      children: this.childViews
    })
  }


}
