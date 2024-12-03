import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    const navigate = useNavigate();

    const handleGoList = () => {
        navigate('/list');
    }
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                한국교원대 근현대사 서비스
            </h1>
            <button className={styles.button} onClick={handleGoList}>
                리스트로 이동
            </button>
        </div>
    );
}
