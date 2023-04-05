import {
    useRoutes,
    Navigate
} from "react-router-dom";
import {list} from './list'

import Empty from '@/views/empty/index'
import Layout from "@/layout";
import View from "@/views/view";

export default function Router() {
    const router = useRoutes([
        {
            path: '/',
            element: <Navigate to={'/home'}/>
        },
        {
            path:'/',
            element:<Layout/>,
            children:[
                ...list.map(u=>{
                    return {
                        path:u.path,
                        element:<View styles={u.style} childDom={u.element} />
                    }
                })
            ]
        },
        {
            path: '*',
            element: <Empty/>
        }

    ]);

    return router
}
