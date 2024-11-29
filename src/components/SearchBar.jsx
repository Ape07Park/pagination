import { useEffect, useState } from "react";
import styles from "../css/SearchBar.module.css";

function SearchBar({ onTerm, onType, onSort, onIsDesc, sendSelectedItemToSearchBar, }) {
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

    // 개별항목 삭제
    const handleRemoveTerm = (indexToRemove) => {

        const newTerms = multipleTerm.filter((_, index) => index !== indexToRemove);
        setMultipleTerm(newTerms);
    };

    useEffect(() => {
        setMultipleTerm(sendSelectedItemToSearchBar);

    }, [sendSelectedItemToSearchBar]);


    return (
        <div className={styles.container}>
            <div className={styles.searchBasket}>
                <h4>검색어 장바구니:</h4>
                {multipleTerm.map((term, index) => (
                    <span key={index} style={{ margin: '0 4px' }}>
                        <span style={{ display: 'none' }}>
                            {term.id}
                        </span>
                        {term.title}
                        <button
                            onClick={() => handleRemoveTerm(index)}
                            className={styles.removeButton}
                        >
                            ×
                        </button>
                        {index < multipleTerm.length - 1 ? ', ' : ''}
                    </span>
                ))}

            </div>

            <select onChange={handleType} value={type} className={styles.select}>
                <option value="title">제목</option>
                <option value="body">컨텐츠</option>
            </select>

            <input
                type="text"
                placeholder="검색어를 넣으세요"
                value={term}
                onChange={handleInputChange}
                onKeyDown={onKeyPress}
                className={styles.input}
            />

            <button onClick={handleSearch} className={styles.button}>검색</button>

            <div>
                <button
                    onClick={() => handleSort('id')}
                    className={`${styles.sortButton} ${sortType === 'id' && styles.active} ${isDesc && styles.desc}`}
                >
                    id 순 정렬 {sortType === 'id' && (isDesc ? '↓' : '↑')}
                </button>

                <button
                    onClick={() => handleSort('title')}
                    className={`${styles.sortButton} ${sortType === 'title' && styles.active} ${isDesc && styles.desc}`}
                >
                    이름 순 정렬 {sortType === 'title' && (isDesc ? '↓' : '↑')}
                </button>
                <button
                    onClick={() => handleSort('body')}
                    className={`${styles.sortButton} ${sortType === 'body' && styles.active} ${isDesc && styles.desc}`}
                >
                    컨텐츠 순 정렬 {sortType === 'body' && (isDesc ? '↓' : '↑')}
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
