import { useEffect, useState } from "react";

function SearchBar({ onTerm, onType, onSort, onIsDesc, sendSelectedItemToSearchBar }) {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("title");
    const [sortType, setSortType] = useState("");
    const [isDesc, setIsDesc] = useState(false);
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

    const handleSort = (newSortType) => {
        if (newSortType === sortType) {
            setIsDesc(!isDesc);
            onIsDesc(!isDesc);
        } else {
            setSortType(newSortType);
            setIsDesc(false);
            onSort(newSortType);
            onIsDesc(false);
        }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // SearchBar 컴포넌트:

    // onRemoveItem prop 추가
    // handleRemoveTerm 함수에서 삭제된 항목을 PostItem에 전달하는 로직 추가
    
    // PostItem 컴포넌트:
    
    // removedTerm prop 추가
    // useEffect를 추가하여 removedTerm이 변경될 때 해당 항목의 체크박스 해제
    // checked 속성을 추가하여 체크박스 상태 관리
    
    // PostList 컴포넌트:
    
    // removedTerm state 추가
    // handleRemoveItem 함수 추가
    // SearchBar와 PostItem 사이의 데이터 전달 로직 구현

    // 개별 항목 삭제 함수
    const handleRemoveTerm = (indexToRemove) => {

        // index가 0,1 로 들어가지 데이터의 id로 들어가지 않음
        // 그럼 title로 비교해야 하나?
        console.log(indexToRemove);
        

        const newTerms = multipleTerm.filter((_, index) => index !== indexToRemove);
        setMultipleTerm(newTerms);
    };

    useEffect(() => {
        setMultipleTerm(sendSelectedItemToSearchBar);
    }, [sendSelectedItemToSearchBar]);

    return (
        <div>
            <div>
                <div className="search-basket">
                    <h4>검색어 장바구니:</h4>
                    {multipleTerm.map((term, index) => (
                        <span key={index} style={{ margin: '0 4px' }}>
                            {term}
                            <button 
                                onClick={() => handleRemoveTerm(index)}
                                style={{
                                    marginLeft: '4px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#666',
                                    cursor: 'pointer',
                                    padding: '0 4px'
                                }}
                            >
                                ×
                            </button>
                            {index < multipleTerm.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
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
                <button onClick={() => handleSort('id')}>
                    id 순 정렬 {sortType === 'id' && (isDesc ? '↓' : '↑')}
                </button>

                <button onClick={() => handleSort('title')}>
                    이름 순 정렬 {sortType === 'title' && (isDesc ? '↓' : '↑')}
                </button>
                <button onClick={() => handleSort('body')}>
                    컨텐츠 순 정렬 {sortType === 'body' && (isDesc ? '↓' : '↑')}
                </button>
            </div>
        </div>
    );
}

export default SearchBar;