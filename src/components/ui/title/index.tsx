import styles from "./index.module.less";
export interface title {
    main_title?: string;
    subtitle?: string;
    main_style?: React.CSSProperties;
    sub_style?: React.CSSProperties;
    style?: React.CSSProperties;
}
const Title = (props: title) => {
    const {
        main_title,
        subtitle,
        main_style = {},
        sub_style = {},
        style,
    } = props;

    return (
        <div className={styles.title} style={style}>
            {main_title ? (
                <div className={styles.main_title} style={{ ...main_style }}>
                    {main_title}
                </div>
            ) : (
                ""
            )}

            {subtitle ? (
                <div className={styles.subtitle} style={{ ...sub_style }}>
                    {subtitle}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
export default Title;
