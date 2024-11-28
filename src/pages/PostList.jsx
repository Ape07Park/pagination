import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import axiosInstance, { fetchData } from "../api/fetch";
import SearchBar from "../components/SearchBar";

export default function PostList() {
    const [datas, setDatas] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [term, setTerm] = useState('');
    const [sortType, setSortType] = useState('');
    const [isDesc, setIsDesc] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axiosInstance.get(`?${query}`);

            const totalItems = response.headers['x-total-count'];
            const res = response.data;

            setDatas(res);
            setTotalCount(totalItems);
        };
        getData();
    }, [query]);

    const handleQuery = (searchTerm, searchType, sortType, isDesc) => {
        const searchQuery = searchTerm ? `${searchType}_like=${searchTerm}` : '';
        const sortQuery = sortType ? `&_sort=${sortType}` : '';
        const orderQuery = `&_order=${isDesc ? 'desc' : 'asc'}`;
        const newQuery = `${searchQuery}${sortQuery}${orderQuery}`;
        
        setQuery(newQuery);
    };

    useEffect(() => {
        handleQuery(term, type, sortType, isDesc);
    }, [term, type, sortType, isDesc]);

    // 검색 장바구니 데이터 받기
    const sendSelectedItemToSearchBar = () => {
        
        return selectedItems;
    }

    // 검색 장바구니 데이터 넘겨주기

    return (
        <>
            <h2>리스트</h2>
            <SearchBar
                onTerm={setTerm}
                onType={setType}
                onSort={setSortType}
                onIsDesc={setIsDesc}
                sendSelectedItemToSearchBar={sendSelectedItemToSearchBar}
            />

            <div>
                {/* 여기서 map 돌려서 PostItem이 반복문을 돌리고 있다는 걸 한 눈에 보이게 하기 */}
                {datas && <PostItem posts={datas} sendSelectedItem={setSelectedItems}/>}
            </div>
        </>
    );
}