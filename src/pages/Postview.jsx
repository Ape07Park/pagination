import { useEffect, useState } from "react";
import axiosInstance from "../service/axios";
import { Link, useLocation } from "react-router-dom";
import styles from '../css/PostView.module.css';

export default function PostView() {

    const location = useLocation();
    const postId = location.state.id;
    const [data, setData] = useState(null);
    const [dataCatch, setDataCatch] = useState(false);

    // 데이터 불러오기
    useEffect(() => {
        if (postId) { // postId가 존재할 때만 데이터 가져오기
            const getDataById = async () => {
                try {
                    const response = await axiosInstance.get(`?id=${postId}`);
                    setData(response.data);
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
        <div className={styles.container}>
            <h1 className={styles.header}>상세보기</h1>
            <ul className={styles.list}>
                <li className={styles['list-item']}>
                    ID: {data[0].id}
                </li>
                <li className={styles['list-item']}>
                    제목: {data[0].title}
                </li>
                <li className={styles['list-item']}>
                    내용: {data[0].body}
                </li>
            </ul>
            <div className={styles['link-container']}>
                <Link to="/list" className={styles.link}>목록으로</Link>
            </div>
        </div>
    );
}
