import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate();

    const handleGoList = () => {
        navigate('/list');
    }
    
    return (
        <>
        <h1>
            한국교원대 근현대사 서비스
        </h1>

        <button onClick={handleGoList}>리스트로 이동</button>

        </>
    )
}