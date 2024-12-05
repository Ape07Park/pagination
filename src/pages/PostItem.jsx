import { useRecoilState } from "recoil";
import { selectedTitle } from "../recoil/selectedTitle";

export function PostItem({ data, showCheckboxes, onPostClick }) {
    const [obj, setObj] = useRecoilState(selectedTitle);

    const handleCheckedItem = (data) => {
        let updatedObj;

        if (obj.some(item => item.id === data.id)) {
           
            updatedObj = obj.filter(item => item.id !== data.id);
        } else {
           
            updatedObj = [...obj, data];
        }

        setObj(updatedObj);
    };

    return (
        <div>
            {showCheckboxes && (
                <input
                    type="checkbox"
                    onChange={() => handleCheckedItem(data)}
                    checked={obj.some(item => item.id === data.id)}
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
