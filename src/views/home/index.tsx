import styles from './index.module.less'
import React from 'react'
import EchartsContainer from '@/components/ui/echarts'
import {option} from '@/data/echarts_data'
import Container from "@/views/home/components/container";


const Home: React.FC<{ style?: React.CSSProperties }> = ({style}) => {

    return (
        <div className={styles.home} style={style}>
            <div className={styles.map}>
                <div className={styles.round}/>
            </div>
            {/*底部echarts图*/}
            <div className={styles.host_of_the_day}>
                <h3 className={styles.heading_level}>当日主机CPU运行情况</h3>
                <div className={styles.echarts_box}>
                    <EchartsContainer echarts_option={option}/>
                </div>
            </div>
            {/*服务器*/}
            <Container type={'server'} style={{left: 823, top: 76}}>
                <div className={styles.container_content}>
                    <div className={styles.numerical_statistics}>

                    </div>
                </div>
            </Container>

            {/*存储*/}
            <Container type={'storage'} style={{right: 31, top: 76}}>
                <div className={styles.container_content}>

                </div>
            </Container>
            {/*网络*/}
            <Container type={'network'} style={{left: 823, top: 403}}>
                <div className={`${styles.container_content} ${styles.network_content}`}>

                </div>
            </Container>
            {/*应用系统*/}
            <Container type={'application_system'} style={{right: 31, top: 403}}>
                <div className={`${styles.container_content} ${styles.network_content}`}>

                </div>
            </Container>
            {/*安全性*/}
            <Container type={'safety'} style={{width: 1064,height:246,minHeight:'auto', left: 823, top: 834}}>
                <div className={`${styles.container_content} ${styles.safety_content}`}>

                </div>
            </Container>
        </div>
    )
}

export default Home
