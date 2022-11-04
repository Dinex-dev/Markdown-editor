

export default function EditArea({ markdown, handleChange }) {
    return (
        <textarea
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
    );
}