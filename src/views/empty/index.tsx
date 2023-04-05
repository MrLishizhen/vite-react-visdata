import styles from './index.module.css'
import React from 'react';
import {useNavigate} from "react-router-dom";

const Empty = () => {
    const navigate = useNavigate();
    const backHome = () => {
        navigate('/')
    }
    return (
        <div className={styles.empty}>404</div>
    )


}
export default Empty
