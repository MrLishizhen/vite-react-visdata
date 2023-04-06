import styles from './index.module.less'
import {ChangeEvent, useEffect, useState} from "react";
import {list} from '../../router/list'
import {useNavigate, useLocation} from 'react-router-dom'
import screenfull from 'screenfull'

const Menus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menu_list, set_menu_list] = useState(list)
    const [path_name, set_path_name] = useState('')
    const [full, set_full] = useState<boolean>(true)
    const [btn_state, set_ben_state] = useState<boolean>(false);

    /*判断路由修改匹配对应menu_item*/
    useEffect(() => {
        set_path_name(location.pathname.slice(1))
    }, [location])
    /*点击隐藏导航栏*/
    const btn_click = () => {
        set_ben_state(!btn_state)
    }
    /*导航跳转*/
    const to_path = (link: string) => {
        navigate(`/${link}`)
    }
    /*点击全屏*/
    const full_click = () => {
        screenfull.toggle();
        set_full(false)
    }
    /*导航查找*/
    const search = (value: string) => {
        set_menu_list(list.filter(u => u.name.indexOf(value) > -1))
    }
    /*sereenfull change事件*/
    useEffect(() => {
        const change = function () {
            set_full(!screenfull.isFullscreen)
        }
        screenfull.on('change', change)
        return () => {
            screenfull.off('change', change);
        }
    }, [])
    return full ? <div className={`${styles.menus} ${btn_state ? styles.menus_hot : ''}`}>

        <div className={styles.search}>
            <input type="text" placeholder={'查找'} onChange={(event) => search(event.target.value)}/>
        </div>
        <div className={styles.icons}>
            <div className={`${styles.btn_icon_full}`} onClick={full_click}/>
            <div className={`${styles.btn_icon} ${btn_state ? styles.hot : ''}`} onClick={btn_click}/>
        </div>
        <ul className={styles.menus_ul}>
            {
                menu_list.map(u => {
                    return (<li key={u.path} onClick={() => to_path(u.path)}
                                className={`${styles.menus_li} ${path_name === u.path ? styles.hot : ''}`}>
                        {
                            u.name
                        }
                    </li>)
                })
            }

        </ul>
    </div> : <></>
}

export default Menus
