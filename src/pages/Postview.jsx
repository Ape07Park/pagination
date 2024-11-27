
import { useEffect, useState } from "react";
import { fetchDataById } from "../api/fetch";
import { useLocation } from "react-router-dom";


export function PostView () {

    const location = useLocation();

    const id = location.state.id;

    const [data, setData] = useState([]);

    // id로 데이터 뿌리기 
    // useEffect에 데이터 가져오는 함수 넣기
    // 엑시오스로 id 넘겨 데이터 가져오기

     // 데이터 불러오기
     useEffect(() => {
       
        const getDataById = async () => {
            // 검색어 적용시켜 데이터 불러오기
            const result = await fetchDataById(id);
            setData(result.data);
            
        };
        getDataById();
    }, []);

    return (
        <>
        <h1>상세보기</h1>
        <ul>
            <li>
                {data.id}
            </li>
            <li>
                {data.title}
            </li>
            <li>
                {data.body}
            </li>
        </ul>
        </>
    )
}