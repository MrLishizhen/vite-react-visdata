import React from "react";

const Test:React.FC<{style?:React.CSSProperties}> = ({style}) => {

    return (
        <div style={{background:'red',...style}}>
            {/*<div className={styles.scale} ref={scale_box}*/}
            {/*     style={{}}/>*/}
        </div>
    )
}

export default  Test
