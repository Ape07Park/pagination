import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import { fetchData } from "../api/fetch";
import SearchBar from "../components/SearchBar";


// 레이아웃
export function PostList() {
    const [datas, setDatas] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('title'); // 기본 검색 타입
    const [term, setTerm] = useState(''); // 기본 검색어
    const [sortType, setSortType] = useState('title'); // 정렬 기준

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData(query);
            setDatas(result.data);
            setTotalCount(result.count);
        };
        getData();
    }, [query]); // query가 변경될 때마다 실행

    // 타입과 검색어를 받아서 쿼리로 조합하기
    const handleQuery = (searchTerm, searchType, sortType) => {
        const newQuery = `${searchType}_like=${searchTerm}${sortType ? `&_sort=${sortType}` : ''}`;
        setQuery(newQuery);
    };

    // 정렬 기준을 적용해 다시 쿼리를 날려 랜더링 시키기 
    

    return (
        <>
            <h2>리스트</h2>
            {/* 검색 */}
            <SearchBar onTerm={(term) => handleQuery(term, type, sortType)} onType={setType} onSort={setSortType}/>

            {/* 아이템 + 페이징 */}
            <div>
                {datas && <PostItem posts={datas} totalCount={totalCount} />}
            </div>
        </>
    );
}
