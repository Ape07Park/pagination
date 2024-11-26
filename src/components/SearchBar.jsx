import { useState } from "react";

function SearchBar({ onTerm, onType }) {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("title"); // 기본값을 title로 설정

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
            <select onChange={handleType} value={type}>
                <option value="title">제목</option>
                <option value="body">컨텐츠</option>
            </select>
            <input
                type="text"
                placeholder="검색어를 넣으세요"
                value={term}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
}

export default SearchBar;
