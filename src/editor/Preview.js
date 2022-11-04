import ReactMarkdown from "react-markdown";


export default function Preview({ markdown }) {
    return (
        <div id="preview" style={{
            border: "1px solid #c8ccd0",
            borderRadius: "5px 5px 0px 0px",
            minHeight: "200px",
        }}>
            <ReactMarkdown>
                {markdown}
            </ReactMarkdown>
        </div>
    );
}