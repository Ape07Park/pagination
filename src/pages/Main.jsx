import { useNavigate } from "react-router-dom"

export function Main () {
    
    const navigate = useNavigate();

    const handleMove = () => {
        navigate('/list')
    }

    return (
        <>

        <h1>메인 페이지</h1>

        <button onClick={handleMove}></button>
       
        </>
    )
}