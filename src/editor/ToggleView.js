

export default function ToggleView({ handlePreview }) {
    return (
        <div style={{
            background: '#f9f9f9',
            padding: '10px',
            border: "1px solid #c8ccd0",
            borderRadius: "5px 5px 0px 0px",
        }}
        >
            <button
                onClick={
                    () => handlePreview(true)
                }
            >
                Preview
            </button>
            <button
                onClick={
                    () => handlePreview(false)
                }
            >
                Edit
            </button>
        </div>
    );
}