export function PostItem({ data, showCheckboxes, onCheckboxChange, onPostClick }) {
    return (
        <div>
            {showCheckboxes && (
                <input
                    type="checkbox"
                    onChange={() => onCheckboxChange(data)}
                />
            )}
            <ul>
                <li>id: {data.id}</li>
                <li onClick={() => onPostClick(data.id)}>title: {data.title}</li>
                <li onClick={() => onPostClick(data.id)}>content: {data.body}</li>
            </ul>
        </div>
    );
}