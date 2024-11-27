
import { useEffect, useState } from "react";
import Paging from "../components/Paging";
import { useNavigate } from "react-router-dom";

export function PostItem({ posts }) {

    const [postItems, setPostItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [selectedItems, setSelectedItems] = useState([]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        if (posts) {
            setPostItems(posts);
            setShowCheckboxes(true); // 검색 후 체크박스 표시
        }
    }, [posts]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // const handleCheckboxChange = (item) => {
    //     setSelectedItems(prev => {
    //         const isSelected = prev.find(selected => selected.id === item.id);
    //         if (isSelected) {
    //             return prev.filter(selected => selected.id !== item.id);
    //         } else {
    //             return [...prev, item];
    //         }
    //     });
    // };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
                            // checked={selectedItems.some(item => item.id === data.id)}
                            // onChange={() => handleCheckboxChange(data)}
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
                totalCount={postItems.length}
                activePage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
}