import React, {useEffect, useRef, createElement, FunctionComponent, useState,} from 'react';
import style from './index.module.less'
import Menus from '@/components/menus'
import {Outlet} from 'react-router-dom'

const Layout = () => {
    return (

            <div className={style.router_box}>
                    <Menus/>
                <div className={style.router_main}>
                    <Outlet/>
                </div>
            </div>
    )
}
export default Layout;

