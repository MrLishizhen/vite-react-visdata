import styles from './index.module.less'
import {useEffect, useState} from "react";
import {list} from '../../router/list'
import {useNavigate, useLocation} from 'react-router-dom'
import screenfull from 'screenfull'

const Menus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [path_name, set_path_name] = useState('')
    const [full,set_full] = useState<boolean>(true)
    const [btn_state, set_ben_state] = useState<boolean>(false);

    useEffect(() => {
        set_path_name(location.pathname.slice(1))
    }, [location])
    const btn_click = () => {
        set_ben_state(!btn_state)
    }
    const to_path = (link: string) => {
        navigate(`/${link}`)
    }
    const full_click = () => {
        screenfull.toggle();
        set_full(false)
    }
    useEffect(()=>{
        const change = function(){
            set_full(!screenfull.isFullscreen)
        }
        screenfull.on('change', change)
        return ()=>{
            screenfull.off('change',change);
        }
    },[])
    return full ?<div className={`${styles.menus} ${btn_state ? styles.menus_hot : ''}`}>

                <div className={styles.search}>
                    <input type="text" placeholder={'查找'}/>
                    <div className={`${styles.btn_icon} ${btn_state ? styles.hot : ''}`} onClick={btn_click}/>
                </div>
                <ul className={styles.menus_ul}>
                    {
                        list.map(u => {
                            return (<li key={u.path} onClick={() => to_path(u.path)}
                                        className={`${styles.menus_li} ${path_name === u.path ? styles.hot : ''}`}>
                                {
                                    u.name
                                }
                            </li>)
                        })
                    }

                </ul>

                <div className={styles.icons}>
                    <div className={`${styles.btn_icon}`} onClick={full_click}/>
                </div>
            </div>:''
}

export default Menus
