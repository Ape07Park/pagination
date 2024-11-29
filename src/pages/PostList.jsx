import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import axiosInstance from "../service/axios";
import SearchBar from "../components/SearchBar";
import Paging from "../components/Paging";
import { useNavigate } from "react-router-dom";
import styles from '../css/PostList.module.css';

export default function PostList() {

    const [datas, setDatas] = useState([]);
    const navigate = useNavigate();

    // 검색
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [term, setTerm] = useState('');
    const [sortType, setSortType] = useState('');
    const [isDesc, setIsDesc] = useState(false);
    
    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageRangeDisplayed = 5;
    const itemsCountPerPage = 10;
    
    // 체크 박스
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // 아이템 가져오기
    useEffect(() => {
        const getData = async () => {
            const response = await axiosInstance.get(`?${query}`);
            const totalItems = response.headers['x-total-count'];
            const res = response.data;

            setDatas(res);
            setTotalCount(totalItems);
            setShowCheckboxes(true);
        };
        getData();
    }, [query]);

    // 검색
    useEffect(() => {
        handleQuery(term, type, sortType, isDesc);
    }, [term, type, sortType, isDesc]);

    // 검색어 완성
    const handleQuery = (searchTerm, searchType, sortType, isDesc) => {
        const searchQuery = searchTerm ? `${searchType}_like=${searchTerm}` : '';
        const sortQuery = sortType ? `&_sort=${sortType}` : '';
        const orderQuery = `&_order=${isDesc ? 'desc' : 'asc'}`;
        const newQuery = `${searchQuery}${sortQuery}${orderQuery}`;
        
        setQuery(newQuery);
    };

    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    const goToPostDetailPage = (id) => {
        navigate('/view', { state: { id: id } });
    };
    
    const indexOfLastItem = currentPage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);
    
    const sendSelectedItemToSearchBar = () => {
        return selectedItems;
    };

    // TODO 체크박스 선택하기 
    const handleCheckboxChange = (id) => {
       
    };
    
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>리스트</h2>
            <SearchBar
                onTerm={setTerm}
                onType={setType}
                onSort={setSortType}
                onIsDesc={setIsDesc}
                sendSelectedItemToSearchBar={sendSelectedItemToSearchBar}
            />

            <div className={styles.postList}>
                {currentItems.map((data) => (
                    <PostItem
                        key={data.id}
                        data={data}
                        showCheckboxes={showCheckboxes}
                        onCheckboxChange={handleCheckboxChange}
                        onPostClick={goToPostDetailPage}
                        className={styles.postItem}
                    />
                ))}
            </div>

            <div className={styles.paging}>
                <Paging
                    totalItemsCount={datas.length}
                    itemsCountPerPage={itemsCountPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={pageRangeDisplayed}
                />
            </div>
        </div>
    );
}
