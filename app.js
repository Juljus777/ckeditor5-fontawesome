import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import {Bold, Italic} from '@ckeditor/ckeditor5-basic-styles';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {Heading} from '@ckeditor/ckeditor5-heading';
import {List} from '@ckeditor/ckeditor5-list';
import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
import fontAwesome6 from "./src/ckeditor5-fontawesome/fontawesome6";
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import {GeneralHtmlSupport} from '@ckeditor/ckeditor5-html-support';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import {FullPage} from "@ckeditor/ckeditor5-html-support";

ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [Essentials, Paragraph, Heading, List, Bold, Italic, GeneralHtmlSupport, FullPage, fontAwesome6, SourceEditing],
        toolbar: ['heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'sourceEditing', 'fontawesome6'],
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                    styles: true
                }
            ]
        },
        fontAwesome6: {
          membership: 'free',
        }
    })
    .then(editor => {
        CKEditorInspector.attach(editor);
    })
    .catch(error => {
        console.error(error.stack);
    });
