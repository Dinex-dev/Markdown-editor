import { useRef } from "react";


export default function EditArea({ markdown, handleChange, setMarkdown }) {

    const textAreaRef = useRef();
    function formatText(action) {
        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedText = textArea.value.substring(start, end);

        const newText = textArea.value.substring(0, start) + action + selectedText + action + textArea.value.substring(end);

        if (['#', '-'].includes(action)) {
            const lineNumber = textArea.value.substring(0, start).split('\n').length;
            let line = textArea.value.split('\n')[lineNumber - 1];
            const DataArr = textArea.value.split('\n');
            if (action === '-') {
                if (line.startsWith('-')) {
                    textArea.focus()
                    return;
                }
                DataArr[lineNumber - 1] = line.startsWith('#') ? line.replace('#', '- #') : `- ${line}`;
                setMarkdown(DataArr.join('\n'));
                textArea.focus();
                localStorage.setItem('md', DataArr.join('\n'));
            }

            if (action === '#') {
                let hStart = ''
                if (line.startsWith('-')) {
                    hStart = '- '
                    line = line.replace('-', '')
                }
                let headingCount = (line.trim().match(/^#*/ig)[0].length + 1)
                DataArr[lineNumber - 1] = hStart + "#".repeat(headingCount) + " " + line.replaceAll('#'.repeat(headingCount - 1), '').trim();
                setMarkdown(DataArr.join('\n'))
                localStorage.setItem("md", DataArr.join('\n'));
            }
        }
        setMarkdown(newText);
        localStorage.setItem("md", newText);
        textArea.focus();
    }
    return (
        <div>
            <div>

                <button onClick={() => formatText('**')}><strong>B</strong></button>
                <button onClick={() => formatText('_')}><i>i</i></button>
                <button onClick={() => formatText('`')}><code>Code</code></button>
                <button onClick={() => formatText('#')}>H</button>
                <button onClick={() => formatText('++')}>U</button>
                <button onClick={() => formatText('-')}>List</button>
                <button onClick={() => formatText('~~')}><strike>S</strike></button>
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