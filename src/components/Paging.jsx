import { useState } from "react";
import Pagination from "react-js-pagination";
import '../css/Paging.css'

export function Paging ({totalCount, onPageChange, activePage, itemsCountPerPage }) {

    const handlePageChange = (page) => {
        onPageChange(page);
    };
  
    return (
      <Pagination
        activePage={activePage} // 현재 페이지
        itemsCountPerPage={itemsCountPerPage} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={totalCount} // 총 아이템 갯수
        pageRangeDisplayed={10} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    );
  };
  
  export default Paging;