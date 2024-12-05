import { useRecoilState } from "recoil";
import { selectedTitle } from "../recoil/selectedTitle";

export function PostItem({ data, showCheckboxes, onPostClick }) {

    const [obj, setObj] = useRecoilState(selectedTitle);

    const handleCheckedItem = (data) => {

        // data는 객체임
        console.log(data);
        
        // 이미 포함되어 있는지 체크

        let objId = obj.id;
        // obj가 없을 때 에러가 발생함
        const isAlreadySelected = objId.includes(data.id);
        let updatedObj;

        if (isAlreadySelected) {
            // 체크되어 있으면 지우기
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
