import axios from "axios";
import { useEffect, useState } from "react"
import { PostItem } from "./PostItem";
import Paging from "../components/Paging";

// 레이아웃
export function PostList() {

    const [datas, setDatas] = useState(null);

    const fetchData = async () => {

        try {
            const response = await axios.get('http://localhost:3001/db');
            const res = response.data;
            setDatas(res.db);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h2>리스트</h2>
            {/* 검색창 */}

            <div>
            {datas && <PostItem posts={datas} />}
            </div>

        </>
    )
}