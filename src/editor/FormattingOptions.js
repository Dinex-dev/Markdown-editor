
function setText(newText, setMarkdown, textArea, end) {
    setMarkdown(newText);
    localStorage.setItem("md", newText);
    textArea.focus();
    textArea.focus();

}
export default function FormattingOptions({ textAreaRef, setMarkdown, cursorPosition }) {

    function coverTextWith(cover) {
        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedText = textArea.value.substring(start, end);
        const newText = textArea.value.substring(0, start) + cover + selectedText + cover + textArea.value.substring(end);
        setText(newText, setMarkdown, textArea, end);
        cursorPosition.current = end + cover.length;
    }
    function handleHeading() {
        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const textArray = textArea.value.split("\n");
        const line = textArea.value.substring(0, start).split("\n").length - 1;
        const selectedText = textArray[line];
        const hCount = selectedText.match(/^#*/)[0].length + 1;
        textArray[line] = "#".repeat(hCount) + " " + selectedText.substring(hCount - 1).trim();
        const newText = textArray.join("\n");
        setText(newText, setMarkdown, textArea, start);
        cursorPosition.current = ((hCount > 1) ? (start + 1) : (start + 2));
        console.log(cursorPosition.current)
    }
    function coverLine(cover) {
        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const textArray = textArea.value.split("\n");
        const line = textArea.value.substring(0, start).split("\n").length - 1;
        const selectedText = textArray[line];
        if (selectedText.startsWith(cover)) {
            textArray[line] = selectedText.substring(cover.length);
            cursorPosition.current = start - cover.length;
        }
        else {
            textArray[line] = cover + selectedText;
            cursorPosition.current = start + cover.length;
        }
        const newText = textArray.join("\n");
        setText(newText, setMarkdown, textArea, start);
    }
    return (
        <div style={{
            background: '#f9f9f9',
            padding: '10px',
            border: "1px solid #c8ccd0",
            borderRadius: "5px 5px 0px 0px",
        }}>
            <div
                style={{
                    fontFamily: "'Carter One', cursive",
                    fontSize: "1.5rem",
                }}
            >MarkdownEditor</div>
            <div>
                <button onClick={() => coverTextWith('**')}><strong>B</strong></button>
                <button onClick={() => coverTextWith('__')}><u>U</u></button>
                <button onClick={() => coverTextWith('*')}><i>I</i></button>
                <button onClick={() => coverTextWith('`')}><code>Code</code></button>
                <button onClick={() => handleHeading()}>H</button>
                <button onClick={() => coverLine("- ")}>List</button>
                <button onClick={() => coverTextWith("~~")}><strike>S</strike></button>
                {/* <button onClick={() => formatText('#')}>H</button>
                <button onClick={() => formatText('++')}>U</button>
                <button onClick={() => formatText('-')}>List</button>
                <button onClick={() => formatText('~~')}><strike>S</strike></button> */}
            </div>
        </div>
    );
}