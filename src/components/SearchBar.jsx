import { useState } from "react";

function SearchBar({ onTerm, onType, onSort }) {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("title");
    
    // 정렬 시 내림차순 여부
    const [isDesc, setIsDesc] = useState(false);

    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    // 타입, 검색어 넘기기
    const handleSearch = () => {
        onType(type);
        onTerm(term);
    };

    // 타입 상태 업데이트
    const handleType = (event) => {
        setType(event.target.value);
    };

    // 정렬 기준 변경

    // TODO 조건: -title 처럼 '-정렬조건'의 형태가 되어야 한다.

    // 처음 정렬 버튼 클릭 -> 내림차순(- 붙이기) -> 다시 정렬 버튼 클릭 -> 오름차순(- 지우기)

    const handleSort = (sortType) => {

        onSort(sortType); // 정렬 기준 넘기기
    }

    // enter 키 눌렀을 때 검색 버튼 누른 것과 같은 효과 나도록 함
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    // 오름차순, 내림차순 정렬
    const handleSortDescAsc = (isDesc) => {

        // if (isDesc === false) {
        //     setIsDesc(true);
        //     // 아래와 같은 식으로 하면 계속 '-'가 붙는다
        //     setSortingType('-' + sortType);  // 정렬 기준 업데이트
        // } else {
        //     setIsDesc(false)
        //     // - 지우는 기능 추가하기
        //     setSortingType(sortType);  // 정렬 기준 업데이트
        // }

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
                onKeyDown={onKeyPress}
            />

            <button onClick={handleSearch}>검색</button>

            <div>
                <button onClick={() => handleSort('title')}>이름 순 정렬</button>
                <button onClick={() => handleSort('body')}>컨텐츠 순 정렬</button>
            </div>

            <div>
                <button onClick={() => handleSortDescAsc(isDesc)}>오름차순 정렬</button>
                <button onClick={() => handleSortDescAsc(isDesc)}>내림차순 정렬</button>

            </div>
        </div>
    );
}

export default SearchBar;