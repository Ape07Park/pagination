import { useEffect, useState } from "react";
import styles from "../css/SearchBar.module.css";

function SearchBar({ onTerm, onType, onSort, onIsDesc, sendSelectedItemToSearchBar, removeTitle}) {
    const [term, setTerm] = useState("");
    const [type, setType] = useState("title");
    const [sortType, setSortType] = useState("");
    const [isDesc, setIsDesc] = useState(false);
    const [multipleTerm, setMultipleTerm] = useState([]);
    const [isDelete, setIstDelete] = useState(false);

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

   // 개별항목 삭제
const handleRemoveTerm = (idToRemove) => {
    // multipleTerm 배열에서 해당 id를 제외한 새로운 배열 생성
    const newTerms = multipleTerm.filter(term => term.id !== idToRemove);
    
    // 검색어 장바구니 업데이트
    setMultipleTerm(newTerms);
    
    // PostList의 체크박스 해제를 위해 id 전달
    removeTitle(idToRemove);
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
                            onClick={() => handleRemoveTerm(term.id)}
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
