import { useEffect, useState } from "react";
import { fetchDataById } from "../api/fetch";
import { useLocation } from "react-router-dom";

export function PostView () {

    const location = useLocation();

    const postId = location.state.id;

    const [data, setData] = useState(null);

    const [dataCatch, setDataCatch] = useState(false);

     // 데이터 불러오기
     useEffect(() => {
        if (postId) { // postId가 존재할 때만 데이터 가져오기
            const getDataById = async () => {
                try {
                    const result = await fetchDataById(postId);
                    setData(result.data);
                    // 데이터 받음 여부 표시
                    setDataCatch(true)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            getDataById();
        }
    }, [postId]);

    if (dataCatch === false) { // 데이터가 로드되지 않았을 때 로딩 상태 표시
        return <div>Loading...</div>;
    }

    return (
        <>
        <h1>상세보기</h1>
        <ul>
            <li>
                {data[0].id}
            </li>
            <li>
                {data[0].title}
            </li>
            <li>
                {data[0].body}
            </li>
        </ul>
        </>
    )
}