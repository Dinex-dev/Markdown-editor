import { useState } from "react";
import EditArea from "./EditArea";
import Preview from "./Preview";
import FormattingOptions from "./FormattingOptions";

export default function DesktopEditor() {
    const localdata = localStorage.getItem("md");
    const [markdown, setMarkdown] = useState(localdata ? localdata : `**Hello world!!!**`);
    const [textAreaData, setTextAreaData] = useState({ textAreaRef: null, cursorPosition: null });
    function handleChange(e) {
        setMarkdown(e.target.value);
        localStorage.setItem("md", e.target.value);
    }
    return (
        <div className="container">
            <div className="preview">
                <Preview markdown={markdown} />
            </div>
            <div className="editArea">
                <EditArea setMarkdown={setMarkdown} markdown={markdown} handleChange={handleChange} setTextAreaData={setTextAreaData} />
            </div>
            <div className="navBar">
                <FormattingOptions textAreaRef={textAreaData.textAreaRef} setMarkdown={setMarkdown} cursorPosition={textAreaData.cursorPosition} />
            </div>
        </div>
    );
}