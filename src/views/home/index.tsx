import styles from './index.module.less'
import React,{useRef, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";

const Home:React.FC<{style?:React.CSSProperties}> = ({style}) => {
    // const navigate = useNavigate();
    // console.log(navigate('/home'))

    return (
        <div className={styles.home} style={style}>
            {/*<div className={styles.scale} ref={scale_box}*/}
            {/*     style={{}}/>*/}
        </div>
    )
}

export default  Home
