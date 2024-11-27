import { useEffect, useState } from "react";

export function PostView () {

    const [data, setData] = useState([]);

    // id로 데이터 뿌리기 
    // useEffect에 데이터 가져오는 함수 넣기 
    // 엑시오스로 id 넘겨 데이터 가져오기

    const fetchDataById = (id) => {

    } 

     // 데이터 불러오기
     useEffect(() => {
        const getDataById = async (id) => {
            // 검색어 적용시켜 데이터 불러오기
            const result = await fetchDataById(id);
            setData(result.data);
            
        };
        getDataById();
    }, []);

    return (
        <>
        </>
    )
}