import { useCallback, useRef } from "react";

export default function useSearchParam(onSearchParam) {

    const term = useRef("");

    // TODO 추후 수정하기
    const type = useRef("title");

    const sortType = useRef("id");
    const isDesc = useRef(false);

    const searchParam = {
        term: "",
        type: 'title',
        sortType: "id",
        isDesc: false,
    };

    // 검색어 변경 핸들러
    const handleInputChange = (event) => {
        term.current = event.target.value;
        searchParam.term = term.current;
    };

    // 검색 버튼 클릭 시 작동하는 핸들러
    // searchParam 객체에 값 넣어서 List 컴포넌트로 전송
    const handleSearch = useCallback(() => {
        searchParam.term = term.current;
        searchParam.type = type.current;
        searchParam.sortType = sortType.current;
        searchParam.isDesc = isDesc.current;
        onSearchParam(searchParam);
    }, [onSearchParam]);

    // 카테고리 변경 핸들러
    const handleType = (event) => {
        type.current = event.target.value;
        handleSearch();
    };

    // 정렬 핸들러
    const handleSort = (newSortType) => {
        if (newSortType === sortType.current) {
            isDesc.current = !isDesc.current;
        } else {
            sortType.current = newSortType;
            isDesc.current = false;
        }
        handleSearch();
    };

    return {
        handleInputChange,
        handleSearch,
        handleType,
        handleSort,
        term,
        type,
        sortType,
        isDesc,
    };

}