export function PostItem({ data, showCheckboxes, onCheckboxChange, onPostClick, isChecked }) {
    return (
        <div>
            {showCheckboxes && (
                <input
                    type="checkbox"
                    onChange={() => onCheckboxChange(data)}
                    checked={isChecked}
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