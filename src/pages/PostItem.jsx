import { useRecoilState } from "recoil";
import { selectedTitle } from "../recoil/selectedTitle";

export function PostItem({ data, showCheckboxes, onPostClick }) {

    const [obj, setObj] = useRecoilState(selectedTitle);

    const handleCheckedItem = (data) => {

        // data는 객체임

        // 이미 포함되어 있는지 체크
        const isAlreadySelected = obj.includes(data.id);
        let updatedTitle;

        if (isAlreadySelected) {
            // 체크되어 있으면 지우기
            updatedTitle = obj.filter(item => item !== data.id);
        } else {

            updatedTitle = [...obj, data];
        }

        setObj(updatedTitle);
    };

    return (
        <div>
            {showCheckboxes && (
                <input
                    type="checkbox"
                    onChange={() => handleCheckedItem(data)}
                    checked={obj.includes(data.id)}
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
