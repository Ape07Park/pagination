
import { useEffect, useState } from "react";
import Paging from "../components/Paging";
import { useNavigate } from "react-router-dom";

export function PostItem({posts, sendSelectedItem}) {

    const [postItems, setPostItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const pageRangeDisplayed = 5;
    const itemsCountPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        if (posts) {
            setPostItems(posts);
            setShowCheckboxes(true);
        }
    }, [posts]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 선택된 데이터 특정 변수에 담기 및 searchBar에 보내기

    // TODO 함수 명, 변수 명 교정하기

    const handleCheckboxChange = (data) => {

        setSelectedItems(prev => {

            let newSelectedItems;

            // 선택 여부 체크
            const isSelected = prev.some(item => item.id === data.id);
            
            if (isSelected) {
                // 이미 선택된 항목이면 제거
                newSelectedItems = prev.filter(item => item.id !== data.id);
            } else {
                // 선택되지 않은 항목이면 추가
                newSelectedItems = [...prev, data];
            }

            // SearchBar의 장바구니에 선택된 항목들의 title을 전달
            const searchTerms = newSelectedItems.map(item => item.title);
            
            // 데이터 전송
            sendSelectedItem(searchTerms);
            
            return newSelectedItems;
        });
    };

    const indexOfLastItem = currentPage * itemsCountPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
    const currentItems = postItems.slice(indexOfFirstItem, indexOfLastItem);

    const goToView = (id) => {
        navigate('/view', { state: { id: id } });
    };

    return (
        <>
            {currentItems.map((data) => (
                <div key={data.id} className="post-item">
                    {showCheckboxes && (
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(data)}
                        />
                    )}
                    <ul>
                        <li>id: {data.id}</li>
                        <li onClick={() => goToView(data.id)}>title: {data.title}</li>
                        <li onClick={() => goToView(data.id)}>content: {data.body}</li>
                    </ul>
                </div>
            ))}

            <Paging
                totalItemsCount={postItems.length}
                itemsCountPerPage={itemsCountPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageRangeDisplayed={pageRangeDisplayed}

            />
        </>
    );
}