export default function SearchModal({dataList}) {

    return(
        <>
        <h1>나는 모달</h1>



        <ul>
            {dataList.map((item) => (
                <li 
                key={item.id}>
                    title: {item.title},
                    content: {item.body}
                </li>
            ))}

        </ul>
        </>
    );
}