import React, {useEffect, useRef, createElement, FunctionComponent, useState,} from 'react';
import screenfull from 'screenfull'

interface Istyles {
    width: number
    height: number
}

const View: React.FC<{
    styles: Istyles,
    childDom?: FunctionComponent
}> = ({childDom, styles}) => {
    const layout_ref = useRef<HTMLDivElement>(null);
    const {width: designDraftWidth, height: designDraftHeight} = styles;
    const [childCss, setChildCss] = useState({
        position: 'absolute',
        left: '50%',
        top: '50%',
        transformOrigin: 'left top',
        transform: '',
        width: 0,
        height: 0
    })
    const handleScreenAuto = () => {
        if (layout_ref.current) {
            const height = layout_ref.current && (layout_ref.current.clientHeight - (screenfull.isFullscreen ? 0 : 40)) || 0;
            const width = layout_ref.current && (layout_ref.current.clientWidth - (screenfull.isFullscreen ? 0 : 40)) || 0;
            //根据屏幕的变化适配的比例
            const scale =
                (width) / (height) < designDraftWidth / designDraftHeight
                    ? (width) / designDraftWidth
                    : (height) / designDraftHeight;
            //缩放比例
            setChildCss({
                ...childCss,
                width: designDraftWidth,
                height: designDraftHeight,
                transform: `scale(${scale}) translate(-50%, -50%)`
            })
        }

    }


    useEffect(() => {
        //元素宽度修改监听
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                // update()
                handleScreenAuto()
            });
        });
        if (layout_ref.current) {
            resizeObserver.observe(layout_ref.current);
        }
        return () => {
            resizeObserver && resizeObserver.disconnect();
        }
    }, [childDom])

    return (

        <div style={{width: '100%', height: '100%', position: "relative"}} ref={layout_ref}>
            {
                childDom && createElement<any>(childDom, {style: {...childCss}})
            }
        </div>
    )
}
export default View

