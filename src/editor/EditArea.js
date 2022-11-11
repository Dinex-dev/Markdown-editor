import { useEffect, useRef } from "react";

export default function EditArea({ markdown, handleChange, setMarkdown, setTextAreaData }) {
    const cursorPosition = useRef(0);
    const textAreaRef = useRef();

    useEffect(() => {
        const textArea = textAreaRef.current;
        textArea.focus();
        textArea.selectionEnd = cursorPosition.current;
    }, [cursorPosition.current]);
    useEffect(() => {
        setTextAreaData({ textAreaRef, cursorPosition });
    }, [textAreaRef, cursorPosition, setTextAreaData]);
    return (
        <textarea
            ref={textAreaRef}
            id="editor"
            onChange={handleChange}
            value={markdown}
            style={{
                resize: 'none',
                border: "1px solid #c8ccd0",
                width: "100%",
                borderRadius: "0px 0px 5px 5px",
                height: "100%",
            }}>
        </textarea>
    );
}