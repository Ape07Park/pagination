import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import { fetchData } from "../api/fetch";
import SearchBar from "../components/SearchBar";

export function PostList() {
    const [datas, setDatas] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('title');
    const [term, setTerm] = useState('');
    const [sortType, setSortType] = useState('title');

    // 데이터 불러오기
    useEffect(() => {
        const getData = async () => {
            // 검색어 적용시켜 데이터 불러오기
            const result = await fetchData(query);
            setDatas(result.data);
            setTotalCount(result.count);
        };
        getData();
    }, [query]);

    // 검색어 조합
    const handleQuery = (searchTerm, searchType, sortType) => {

        const searchQuery  = searchTerm ? `${searchType}_like=${searchTerm}` : '';
        const sortQuery = `${sortType ? `&_sort=${sortType}` : ''}`;
        const newQuery = `${searchQuery}${sortQuery}`;

        setQuery(newQuery);
    };

    // 검색 적용하기
    useEffect(() => {
        handleQuery(term, type, sortType);
    }, [term, type, sortType]);


    return (
        <>
            <h2>리스트</h2>
            <SearchBar
                onTerm={setTerm}
                onType={setType}
                onSort={setSortType}
            />
            <div>
                {datas && <PostItem posts={datas} totalCount={totalCount} />}
            </div>
        </>
    );
}
