import { useState } from "react";

function SortBar({ onTerm, onType }) {

    // 정렬
    const [sort, setSort] = useState("");

    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    const handleSearch = () => {
        onType(type); // 타입을 리스트 모달로 넘김
        onTerm(term); // 검색어를 리스트 모달로 넘김
    };

    const handleType = (event) => {
        setType(event.target.value); // 타입 상태 업데이트
    };

    return (
        <div>
            <button onClick={handleSearch}>이름 순 정렬</button>
            <button onClick={handleSearch}>컨텐츠 순 정렬?</button>
        </div>
    );
}

export default SortBar;
