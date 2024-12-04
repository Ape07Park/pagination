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

    const [searchParam, setSearchParam] = useState({
        term: "",
        type: 'title',
        sortType: "",
        isDesc: false,
    });

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageRangeDisplayed = 5;
    const itemsCountPerPage = 10;

    // 체크 박스
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    /**
     * 데이터 가져오기
     */
    useEffect(() => {
        const getData = async () => {
            const response = await axiosInstance.get(`?${query}`);
            const totalItems = response.headers['x-total-count'];

            if (totalItems) {
                setTotalCount(parseInt(totalItems, 10));
            } else {
                console.warn("x-total-count 헤더가 없습니다.");
            }

            const res = response.data;

            setDatas(res);
            setTotalCount(totalItems);
            setShowCheckboxes(true);
        };
        getData();
    }, [query]);

    // 검색
    useEffect(() => {
        handleQuery(searchParam);
    }, [searchParam]);

    // 검색어 완성
    const handleQuery = (searchParam) => {
        const searchQuery = searchParam.term ? `${searchParam.type}_like=${searchParam.term}` : '';
        const sortQuery = searchParam.type ? `&_sort=${searchParam.sortType}` : '';
        const orderQuery = `&_order=${searchParam.isDesc ? 'desc' : 'asc'}`;
        const newQuery = `${searchQuery}${sortQuery}${orderQuery}`;

        setQuery(newQuery);
    };

    // 페이지 변경
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 디테일 페이지로 이동
    const goToPostDetailPage = (id) => {
        navigate('/view', { state: { id: id } });
    };

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

    // 검색어 장바구니에 있는 거 꺼내기
    const sendSelectedItemToSearchBar = () => {
        return selectedItems;
    };

    // 검색어 장바구니에는 id, title이 들어가게 하기

    // 체크박스 체크되면 검색어 장바구니에 넣는 함수
    const handleCheckboxChange = (data) => {
        const currentSelected = [...selectedItems];
        const dataId = data.id;

        const existingIndex = currentSelected.findIndex(item => item.id === dataId);

        if (existingIndex >= 0) {

            currentSelected.splice(existingIndex, 1);
        } else {
            let dataObj = {
                id: dataId,
                title: data.title
            }
            currentSelected.push(dataObj);
        }
        setSelectedItems(currentSelected);
    };


    // 아이디 값 받아서 일치하는 거 체크박스 취소하기
    const handleRemoveCheck = (id) => {
        
        const currentSelected = [...selectedItems];

        const existingIndex = currentSelected.findIndex(item => item.id === id);
        if (existingIndex >= 0) {
            currentSelected.splice(existingIndex, 1);
        }
        setSelectedItems(currentSelected);

    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title} style={{ textAlign: 'center' }}>리스트</h2>
            <SearchBar
                onSearchParam={handleQuery}
                sendSelectedItemToSearchBar={sendSelectedItemToSearchBar}
                removeTitle={handleRemoveCheck}
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
                        isChecked={selectedItems.some(item => item.id === data.id)}
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
