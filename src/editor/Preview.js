import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export default function Preview({ markdown }) {
    return (
        <div id="preview" style={{
            border: "1px solid #c8ccd0",
            borderRadius: " 0px 0px 5px 5px",
            minHeight: "200px",
            padding: "20px",
        }}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                children={markdown.replace(/\n/g, "\n\n")}>
            </ReactMarkdown>
        </div >
    );
}