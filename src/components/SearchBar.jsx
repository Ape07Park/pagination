import { useCallback, useEffect, useRef } from "react";
import styles from "../css/SearchBar.module.css";
import  useSearchParam  from '../hooks/useSearchParam';

// 구조화 방안
// 1. 검색 파라미터 객체로 묶기
// 2. 기능 분리

function SearchBar({ onSearchParam }) {
   
    const multipleTerm = useRef([]);

    // 검색 관련 커스텀 훅
    const {
        handleInputChange,
        handleSearch,
        handleType,
        handleSort,
        term,
        type,
        sortType,
        isDesc,
    } = useSearchParam(onSearchParam);

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


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
