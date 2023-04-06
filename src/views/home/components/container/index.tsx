import styles from "./index.module.less";
import React from "react";
import server from '../../images/server.svg'
import application_system from '../../images/application_system.svg'
import network from '../../images/network.svg'
import storage from '../../images/storage.svg'
import safety from '../../images/safety.svg'

interface Container {
    type: 'server' | 'application_system' | 'network' | 'storage' | 'safety',
    children?: React.ReactNode,
    style?: React.CSSProperties
}


const Container: React.FC<Container> = ({type, style, children}) => {
    const top_bg = () => {
        if (type === 'server') {
            return server
        } else if (type === 'application_system') {
            return application_system
        } else if (type === 'network') {
            return network
        } else if (type === 'storage') {
            return storage
        } else if (type === 'safety') {
            return safety
        }
    }
    return (
        <div className={styles.container_box} style={{...style}}>
            <h3 className={styles.container_top} style={{backgroundImage: `url(${top_bg()})`}}/>
            {
                children
            }
        </div>
    )
}
export default Container
