import { useRecoilState } from "recoil";
import { selectedTitle } from "../recoil/selectedTitle";

export function PostItem({ data, showCheckboxes, onPostClick, isChecked }) {

    const [title, setTitle] = useRecoilState(selectedTitle);

    // 여기서 선택된 거 title에 담아 searchCart로 넘기기 

    return (
        <div>
            {showCheckboxes && (
                <input
                    type="checkbox"
                    onChange={() => (data)}
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