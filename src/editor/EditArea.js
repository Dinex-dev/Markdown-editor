import { useEffect } from "react";
import { useRef } from "react";

function setText(newText, setMarkdown, textArea, end) {
    setMarkdown(newText);
    localStorage.setItem("md", newText);
    textArea.focus();
    textArea.focus();

}

export default function EditArea({ markdown, handleChange, setMarkdown }) {
    const cursorPosition = useRef(0);
    const textAreaRef = useRef();
    function coverTextWith(cover) {
        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedText = textArea.value.substring(start, end);
        const newText = textArea.value.substring(0, start) + cover + selectedText + cover + textArea.value.substring(end);
        setText(newText, setMarkdown, textArea, end);
        cursorPosition.current = end + cover.length;
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

    useEffect(() => {
        const textArea = textAreaRef.current;
        textArea.focus();
        textArea.selectionEnd = cursorPosition.current;
    }, [cursorPosition.current]);
    return (
        <div>
            <div>

                <button onClick={() => coverTextWith('**')}><strong>B</strong></button>
                <button onClick={() => coverTextWith('_')}><i>i</i></button>
                <button onClick={() => coverTextWith('`')}><code>Code</code></button>
                <button onClick={() => handleHeading()}>H</button>
                <button onClick={() => coverLine("- [x] ")}>Check</button>
                <button onClick={() => coverLine("- ")}>List</button>
                <button onClick={() => coverTextWith("~")}><strike>S</strike></button>
                {/* <button onClick={() => formatText('#')}>H</button>
                <button onClick={() => formatText('++')}>U</button>
                <button onClick={() => formatText('-')}>List</button>
                <button onClick={() => formatText('~~')}><strike>S</strike></button> */}
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
                        width: "100%",
                    }
                }>
            </textarea>
        </div>
    );
}









// function formatText(action) {
//     const textArea = textAreaRef.current;
//     const start = textArea.selectionStart;
//     const end = textArea.selectionEnd;
//     const selectedText = textArea.value.substring(start, end);

//     const newText = textArea.value.substring(0, start) + action + selectedText + action + textArea.value.substring(end);

//     if (['#', '-'].includes(action)) {
//         const lineNumber = textArea.value.substring(0, start).split('\n').length;
//         let line = textArea.value.split('\n')[lineNumber - 1];
//         const DataArr = textArea.value.split('\n');
//         if (action === '-') {
//             if (line.startsWith('-')) {
//                 textArea.focus()
//                 return;
//             }
//             DataArr[lineNumber - 1] = '- ' + line;
//             console.log(DataArr.join('\n'));
//             //DataArr[lineNumber - 1] = line.startsWith('#') ? line.replace('#', '- #') : `- ${line}`;
//             setMarkdown(DataArr.join('\n'));
//             textArea.focus();
//             localStorage.setItem('md', DataArr.join('\n'));

//         }

//         if (action === '#') {
//             let hStart = ''
//             if (line.startsWith('-')) {
//                 hStart = '- '
//                 line = line.replace('-', '')
//             }
//             let headingCount = (line.trim().match(/^#*/ig)[0].length + 1)
//             DataArr[lineNumber - 1] = hStart + "#".repeat(headingCount) + " " + line.replaceAll('#'.repeat(headingCount - 1), '').trim();
//             setMarkdown(DataArr.join('\n'))
//             localStorage.setItem("md", DataArr.join('\n'));
//         }
//     }
//     setMarkdown(newText);
//     localStorage.setItem("md", newText);
//     textArea.focus();
//     textArea.selectionEnd = end;
// }