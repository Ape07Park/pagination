import { useRecoilValue } from "recoil";
import { selectedTitle } from "../recoil/selectedTitle";
import SearchModal from "../pages/SearchModal";
import { useState } from "react";

export default function SearchCart() {
    const titleList = useRecoilValue(selectedTitle);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSearch = () => {
        // 검색 시 모달 나오면서 검색 장바구니에 있던 것들을 모달창에 띄우기
        setModalOpen(true);
    };

    return (
        <>
            <h4 style={{ textAlign: 'center' }}>
                검색어 장바구니
            </h4>
            <div>
                개수: {titleList.length}
            </div>
            <ul>
                {titleList.map((title, index) => (
                    <li key={index}>{title.title}</li>
                ))}
            </ul>
            <div>
                <button onClick={handleSearch}>검색하기(모달나옴)</button>
            </div>

            <SearchModal
                dataList={titleList}
                isOpen={modalOpen}
            />
        </>
    );
}
