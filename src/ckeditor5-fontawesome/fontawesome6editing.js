import {Plugin} from "@ckeditor/ckeditor5-core";

export default class fontAwesome6Editing extends Plugin {
    init () {
        const editor = this.editor;
        console.log("edit init");
        this._defineSchema();
        this._downcastFAIcons(editor);
        this._upcastFAIcons(editor);
    }

    _upcastFAIcons(editor) {
        editor.conversion.for('upcast').elementToElement({
            view: {
                name: 'i',
                classes: 'fa'
            },
            model: (viewElement, {writer}) => {
                return writer.createElement('faIcon')
            }
        })
    }

    _downcastFAIcons(editor){
        editor.conversion.for("downcast").elementToElement({
            model: "faIcon",
            view: (modelElement, {writer}) => {
                return writer.createContainerElement('i', {class: 'fa'})
            }
        })
    }

    _defineSchema() {
        const schema = this.editor.model.schema;
        schema.register('faIcon', {
            allowIn: ['$root', '$block', '$blockObject', '$container'],
            isBlock: true,
            isObject: true,
            isSelectable: true,
            isContent: true
        })
        console.log(schema);
    }
}