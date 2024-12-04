import { useEffect, useRef, useState } from "react";
import styles from "../css/SearchBar.module.css";

function SearchBar({ onTerm, onType, onSort, onIsDesc, sendSelectedItemToSearchBar, removeTitle }) {
    const term = useRef("");
    const type = useRef("title");
    const sortType = useRef("");
    const isDesc = useRef(false);
    const multipleTerm = useRef([]);

    // 검색어 변경 핸들러
    const handleInputChange = (event) => {
        term.current = event.target.value;
    };

    // 검색 버튼 클릭 시 작동하는 핸들러
    const handleSearch = () => {
        onType(type.current);
        onTerm(term.current);
    };

    // 카테고리 변경 핸들러
    const handleType = (event) => {
        type.current = event.target.value;
        // select 변경 시에는 즉시 검색 실행
        handleSearch();
    };

    // 정렬 핸들러
    const handleSort = (newSortType) => {
        if (newSortType === sortType.current) {
            isDesc.current = !isDesc.current;
            onIsDesc(isDesc.current);
        } else {
            sortType.current = newSortType;
            isDesc.current = false;
            onSort(newSortType);
            onIsDesc(false);
        }
    };


    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 검색어 장바구니에서 검색어 제거
    const handleRemoveTerm = (idToRemove) => {
        const newTerms = multipleTerm.current.filter(term => term.id !== idToRemove);
        multipleTerm.current = newTerms;
        removeTitle(idToRemove);
    };

    useEffect(() => {
        multipleTerm.current = sendSelectedItemToSearchBar;
    }, [sendSelectedItemToSearchBar]);

    return (
        <div className={styles.container}>
            {/* 검색어 장바구니 */}

            {/* <div className={styles.searchBasket}>
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
            </div> */}

            <select
                onChange={handleType}
                value={type.current}
                className={styles.select}
            >
                <option value="title">제목</option>
                <option value="body">컨텐츠</option>
            </select>

            <input
                type="text"
                placeholder="검색어를 넣으세요"
                onChange={handleInputChange}
                onKeyDown={onKeyPress}
                className={styles.input}
            />

            <button onClick={handleSearch} className={styles.button}>검색</button>

            <div>
                <button
                    onClick={() => handleSort('id')}
                    className={`${styles.sortButton} ${sortType.current === 'id' && styles.active} ${isDesc.current && styles.desc}`}
                >
                    id 순 정렬 {sortType.current === 'id' && (isDesc.current ? '↓' : '↑')}
                </button>

                <button
                    onClick={() => handleSort('title')}
                    className={`${styles.sortButton} ${sortType.current === 'title' && styles.active} ${isDesc.current && styles.desc}`}
                >
                    이름 순 정렬 {sortType.current === 'title' && (isDesc.current ? '↓' : '↑')}
                </button>

                <button
                    onClick={() => handleSort('body')}
                    className={`${styles.sortButton} ${sortType.current === 'body' && styles.active} ${isDesc.current && styles.desc}`}
                >
                    컨텐츠 순 정렬 {sortType.current === 'body' && (isDesc.current ? '↓' : '↑')}
                </button>
            </div>
        </div>
    );
}

export default SearchBar;