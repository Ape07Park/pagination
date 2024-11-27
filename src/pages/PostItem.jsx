
import { useEffect, useState } from "react";
import Paging from "../components/Paging";
import { useNavigate } from "react-router-dom";

// 내용물
export function PostItem ({posts}) {

   const [postItems, setPostItems] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;
   const navigate = useNavigate();

   useEffect(() => {
    if (posts) {
        setPostItems(posts);
    } 
   }, [posts]);

   const handlePageChange = (page) => {
        setCurrentPage(page)
   }

    // 페이지의 첫 아이템
    const indexOfLastItem = currentPage * itemsPerPage;
    // 페이지의 마지막 아이템
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // 현제 아이템
    const currentItems = postItems.slice(indexOfFirstItem, indexOfLastItem);

    // 클릭 -> 페이지 이동
    const goToView = (id) => {
        
        navigate('/view', {state : {id: id}});
    }

    return (
        <>

            {/* 내용 map 하기 */}
            {currentItems.map((data) => (
                <ul key={data.id}>
                    <li>id: {data.id}</li>
                    <li onClick={() => goToView(data.id)}>title: {data.title}</li>
                    <li onClick={() => goToView(data.id)}>content: {data.body}</li>
                </ul>
            ))}

            {/* 페이징 넣기 */}
            <Paging
                totalCount={postItems.length}
                activePage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
}