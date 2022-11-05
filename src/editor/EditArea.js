import { useRef } from "react";


export default function EditArea({ markdown, handleChange, setMarkdown }) {

    const textAreaRef = useRef();
    function formatText(action) {
        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        if (start === end) {
            return;
        }
        const selectedText = textArea.value.substring(start, end);
        const newText = textArea.value.substring(0, start) + action + selectedText + action + textArea.value.substring(end);
        setMarkdown(newText);
        localStorage.setItem("md", newText);
        textArea.focus();
    }
    return (
        <div>
            <div className="fomatting-options">

                <button onClick={() => formatText('**')}><strong>B</strong></button>
                <button onClick={() => formatText('_')}><i>I</i></button>
                <button onClick={() => formatText('`')}><code>Code</code></button>

            </div>
            <textarea
                ref={textAreaRef}
                id="editor"
                rows="10"
                cols="50"
                onChange={handleChange}
                value={markdown}
                style={
                    {
                        resize: 'vertical',
                        border: "1px solid #c8ccd0",
                        borderRadius: "0px 0px 5px 5px",
                    }
                }>
            </textarea>
        </div>
    );
}