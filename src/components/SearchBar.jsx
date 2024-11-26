import { useState } from "react";

function SearchBar({ onTerm, onType, onSort }) {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("title"); // 기본값을 title로 설정
    const [sortType, setSortType] = useState("title");

    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    // 타입, 검색어 넘기기
    const handleSearch = () => {
        onType(type);
        onTerm(term);
        onSort(setType);
    };

    const handleType = (event) => {
        setType(event.target.value); // 타입 상태 업데이트
    };

     // 정렬 기준 변경
     const handleSort = (sortType) => {
        setSortType(sortType);  // Sort 상태 업데이트
    }

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

            <div>

                <button onClick={() => handleSort('title')}>이름 순 정렬</button>
                <button onClick={() => handleSort('body')}>컨텐츠 순 정렬</button>
            </div>
        </div>
    );
}

export default SearchBar;
