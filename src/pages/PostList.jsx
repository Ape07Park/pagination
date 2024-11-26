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

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData(query);
            setDatas(result.data);
            setTotalCount(result.count);
        };
        getData();
    }, [query]); // query가 변경될 때마다 실행

    // 타입과 검색어를 받아서 쿼리로 조합하기
    const handleQuery = (searchTerm, searchType) => {
        setQuery(`${searchType}_like=${searchTerm}`);
    };

    return (
        <>
            <h2>리스트</h2>
            {/* 검색 */}
            <SearchBar onTerm={(term) => handleQuery(term, type)} onType={setType} />

            {/* 정렬 */}
            

            {/* 아이템 + 페이징 */}
            <div>
                {datas && <PostItem posts={datas} totalCount={totalCount} />}
            </div>

        </>
    );
}
