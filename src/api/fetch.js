import axios from "axios";

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
