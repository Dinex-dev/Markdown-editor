import { useState } from "react";
import Preview from "./Preview";
import EditArea from "./EditArea";
import ToggleView from "./ToggleView";

export default function MdEditor() {
    const [markdown, setMarkdown] = useState(`**Hello world!!!**`);
    function handleChange(e) {
        setMarkdown(e.target.value);
    }
    const [isPreview, setIsPreview] = useState(false);
    function handlePreview(preview) {
        setIsPreview(preview);
    }

    return (
        <div
            style={{
                margin: "20px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <ToggleView handlePreview={handlePreview} />

                {isPreview ? (
                    <Preview markdown={markdown} />
                ) : (
                    <EditArea markdown={markdown} handleChange={handleChange} />
                )}
            </div>
        </div>
    );
}
