import { useRecoilValue } from "recoil";
import { selectedTitle } from "../recoil/selectedTitle";

export default function SearchCart() {


   const titleList = useRecoilValue(selectedTitle);

    // const handleCheckboxChange = (data) => {
    //     const currentSelected = [...selectedItems];
    //     const dataId = data.id;

    //     const existingIndex = currentSelected.findIndex(item => item.id === dataId);

    //     if (existingIndex >= 0) {

    //         currentSelected.splice(existingIndex, 1);
    //     } else {
    //         let dataObj = {
    //             id: dataId,
    //             title: data.title
    //         }
    //         currentSelected.push(dataObj);
    //     }
    //     setSelectedItems(currentSelected);
    // };

    return(
        <>
        <h4 style={{textAlign:'center'}}>
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

        <button>검색하기(모달나옴)</button>
        </div>
        </>
    );
}