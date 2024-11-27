import { useState } from "react";

function SearchBar({ onTerm, onType, onSort, onIsDesc }) {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("title");
    const [sortType, setSortType] = useState("");
    const [isDesc, setIsDesc] = useState(false);

    const [openSearchInput, setOpenSearchInput] = useState(false);

    // 검색어 장바구니의 내용물을 담는 곳
    const [multipleTerm, setMultipleTerm] = useState([]);

    const handleInputChange = (event) => {
        setTerm(event.target.value);
    };

    const handleSearch = () => {
        onType(type);
        onTerm(term);
    };

    const handleType = (event) => {
        setType(event.target.value);
    };

    // 정렬 타입 선택 시 호출되는 함수
    const handleSort = (newSortType) => { // title이나 body 들어옴

        // 같은 정렬 타입을 다시 선택한 경우 오름차순/내림차순 토글
        if (newSortType === sortType) {

            // 버튼 클릭 시 원래 정렬과 반대로 되야하기에 ! 붙임

            setIsDesc(!isDesc); // 정렬 타입 적용
            onIsDesc(!isDesc); // 정렬 타입 전달
        } else {
            // 새로운 정렬 타입 선택 시 항상 오름차순으로 시작

            // 상태 적용
            setSortType(newSortType);
            setIsDesc(false);

            // 상태 전달
            onSort(newSortType);
            onIsDesc(false);
        }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

   // 검색을 하면 체크 박스 나오며 체크박스 된 것은 맨 위의 검색어 장바구니에 추가 됨. 검색어 장바구니에 있는 것은 다른 검색 버튼 클릭 시 서버에서 데이터 가져옴

    return (
        <div>

            <div>
                {/* 버튼 클릭 -> 검색창 나오기 -> 검색 -> 검색 결과 나오고 옆에 체크박스 -> 채크 박스 된 거 검색어에 추가 -> 자료보기 클릭 -> 관련 자료 나옴  */}

            </div>

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

                <button
                    onClick={() => handleSort('id')}
                >
                    id 순 정렬 {sortType === 'id' && (isDesc ? '↓' : '↑')}
                </button>

                <button
                    onClick={() => handleSort('title')}
                >
                    이름 순 정렬 {sortType === 'title' && (isDesc ? '↓' : '↑')}
                </button>
                <button
                    onClick={() => handleSort('body')}
                >
                    컨텐츠 순 정렬 {sortType === 'body' && (isDesc ? '↓' : '↑')}
                </button>
            </div>
        </div>
    );
}

export default SearchBar;