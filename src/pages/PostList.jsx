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

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData(query);
            setDatas(result.data);
            setTotalCount(result.count);
        };
        getData();
    }, [query]);

    const handleQuery = (searchTerm, searchType, sortType) => {
        const newQuery = `${searchType}_like=${searchTerm}${sortType ? `&_sort=${sortType}` : ''}`;
        setQuery(newQuery);
    };

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
