import {Plugin} from "@ckeditor/ckeditor5-core";
import fontAwesome6UI from "./fontawesome6ui";
import fontAwesome6Editing from "./fontawesome6editing";
import {GeneralHtmlSupport} from "@ckeditor/ckeditor5-html-support";
export default class fontAwesome6 extends Plugin {

    static get requires() {
        return [fontAwesome6UI, fontAwesome6Editing, GeneralHtmlSupport]
    }
    init () {
       // const response = search({query: "coff", version: "6.0.0", count: 5});
    }
}