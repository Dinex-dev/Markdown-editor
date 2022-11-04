import { useState } from "react";
import Preview from "./Preview";
import EditArea from "./EditArea";
import ToggleView from "./ToggleView";

export default function MdEditor() {
    const [markdown, setMarkdown] = useState(`**Hello world!!!**`);
    function handleChange(e) {
        setMarkdown(e.target.value);
    }
    const [isPreview, setIsPreview] = useState('edit');
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

                {isPreview === "preview" ?
                    (<Preview markdown={markdown} />) :
                    (isPreview === "edit" ? (
                        <EditArea markdown={markdown} handleChange={handleChange} />) :
                        (isPreview === "split" ? (<>
                            <Preview markdown={markdown} />
                            <EditArea markdown={markdown} handleChange={handleChange} />
                        </>) :
                            (<></>)))}
            </div>
        </div>
    );
}
