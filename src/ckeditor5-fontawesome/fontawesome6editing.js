import {Plugin} from "@ckeditor/ckeditor5-core";

export default class fontAwesome6Editing extends Plugin {
    init () {
        const editor = this.editor;
        this._defineSchema();
        this._downcastFAIcons(editor);
        this._upcastFAIcons(editor);
    }

    _upcastFAIcons(editor) {
        const upcast = editor.conversion.for('upcast');
        upcast.elementToElement({
            view: {
                name: 'i',
                classes: 'fa'
            },
            model: (viewElement, {writer}) => {
                if (!viewElement) return;
                // Regex stolen from
                // https://stackoverflow.com/a/56057539
                // https://regex101.com/r/zPuxg0/3
                const faRegex = 'fa-[a-zA-Z0-9-]+';
                const icon = viewElement.getAttribute('class').match(faRegex);
                return writer.createElement('faIcon', {icon: icon ? icon[0] : ''})
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
        editor.conversion.for('downcast').attributeToAttribute({
            model: {
                name: 'faIcon',
                key: 'icon'
            },
            view: modelAttributeValue => {
                return {
                    key: 'class',
                    value: modelAttributeValue
                };
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
            isContent: true,
            allowAttributes: [
              'icon',
            ],
        })
    }
}
