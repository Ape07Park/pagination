import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import Paging from "../components/Paging";
import { fetchData } from "../api/fetch";

// 레이아웃
export function PostList() {
    const [datas, setDatas] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [query, setQuery] = useState(''); // 기본 쿼리 설정

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData(query);
            setDatas(result.data);
            setTotalCount(result.count);
        };
        getData();
    }, [query]); // query가 변경될 때마다 실행

    return (
        <>
            <h2>리스트</h2>
            <div>
                {datas && <PostItem posts={datas} totalCount={totalCount} />}
            </div>
        </>
    );
}
