
import { useEffect, useState } from "react";
import Paging from "../components/Paging";

// 내용물
export function PostItem ({posts}) {

   const [postItems, setPostItems] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 5;

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

    return (
        <>
            {/* 내용 map 하기 */}
            {currentItems.map((data) => (
                <ul key={data.id}>
                    <li>title: {data.title}</li>
                    <li>content: {data.body}</li>
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