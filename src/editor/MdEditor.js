import { useState } from "react";
import Preview from "./Preview";
import EditArea from "./EditArea";
import ToggleView from "./ToggleView";

export default function MdEditor() {
    const localdata = localStorage.getItem("md");
    const [markdown, setMarkdown] = useState(localdata ? localdata : `**Hello world!!!**`);
    function handleChange(e) {
        setMarkdown(e.target.value);
        localStorage.setItem("md", e.target.value);
    }
    const [isPreview, setIsPreview] = useState('edit');
    function handlePreview(preview) {
        setIsPreview(preview);
    }
    return (
        <div
            style={{
                margin: "20px",
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                <ToggleView handlePreview={handlePreview} />

                {isPreview === "preview" ?
                    (<Preview markdown={markdown} />) :
                    (isPreview === "edit" ? (
                        <EditArea setMarkdown={setMarkdown} markdown={markdown} handleChange={handleChange} />) :
                        (isPreview === "split" ? (<>
                            <Preview markdown={markdown} />
                            <EditArea setMarkdown={setMarkdown} markdown={markdown} handleChange={handleChange} />
                        </>) :
                            (<></>)))}
            </div>
        </div>
    );
}