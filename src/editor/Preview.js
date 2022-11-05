import showdown from "showdown";
import { Markup } from "interweave";


export default function Preview({ markdown }) {
    const converter = new showdown.Converter({
        disableForced4SpacesIndentedSublists: true,
        emoji: true,
        ghCodeBlocks: true,
        tables: true,
        strikethrough: true,
        tasklists: true,
        underline: true,
    });
    const html = converter.makeHtml(markdown.replace(/\n/g, "\n\n"));
    console.log(html)
    return (
        <div id="preview" style={{
            border: "1px solid #c8ccd0",
            borderRadius: " 0px 0px 5px 5px",
            minHeight: "200px",
            padding: "20px",
        }}>
            <Markup content={html} />
        </div >
    );
}