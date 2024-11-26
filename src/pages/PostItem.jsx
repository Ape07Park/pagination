
import { useEffect, useState } from "react";
import Paging from "../components/Paging";
import SearchBar from "../components/SearchBar";

// 내용물
export function PostItem ({posts}) {

   const [postItems, setPostItems] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;

   console.log(posts);
   

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
            {/* 검색 */}
            {/* 서치에서 받은 검색어를 서버로 보내 데이터 가져오기 */}
            <SearchBar />

            {/* 내용 map 하기 */}
            {currentItems.map((data) => (
                <ul key={data.id}>
                    <li>id: {data.id}</li>
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