import axios from "axios";

// 검색 조건에 맞게 모든 데이터 가져오기
export async function fetchData(query) {
    try {
        const response = await axios.get(`http://localhost:3001/posts?${query}`);
        const totalItems = response.headers['x-total-count']; // 헤더에서 총 아이템 수 가져오기
        const res = response.data;
        return { data: res, count: parseInt(totalItems, 10) };

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// id로 데이터 1개 가져오기
export async function fetchDataById(Id) {
    try {
        const response = await axios.get(`http://localhost:3001/posts?id=${Id}`);
        const res = response.data;
        return { data: res };

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

