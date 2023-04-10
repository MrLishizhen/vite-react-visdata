import styles from "./index.module.less";
import React, { ReactSVGElement, useEffect, useState } from "react";
import server_title from "../../images/server_title.svg";
import storage_title from "../../images/storage_title.svg";
import application_system_title from "../../images/application_system_title.svg";
import Title from "@/components/ui/title";
import { title } from "@/components/ui/title";
interface alarm_fault {
    name: string;
    value: string;
    style: React.CSSProperties;
}
interface numericalStatistics {
    type: "server" | "storage" | "application_system";
    alarm_fault_data?: alarm_fault[];
    title_data?: title;
}

const NumericalStatistics = (props: numericalStatistics) => {
    const { type, alarm_fault_data = [], title_data = {} } = props;
    const [bg_img, set_bg_img] = useState("");
    useEffect(() => {
        switch (type) {
            case "server":
                set_bg_img(server_title);
                break;
            case "storage":
                set_bg_img(storage_title);
                break;
            case "application_system":
                set_bg_img(application_system_title);
                break;
        }
    }, [type]);

    return (
        <div className={styles.numerical_statistics}>
            <div
                className={styles.numerical_statistics_left}
                style={{ backgroundImage: `url(${bg_img})` }}
            >
                <div className={styles.title_box}>
                    <Title
                        main_title={title_data.main_title}
                        subtitle={title_data.subtitle}
                    />
                </div>
                <div className={styles.list_box}>
                    <div className={styles.list_item}>
                        <div className={styles.list_title}>运行正常</div>
                        <div className={styles.list_cont}>
                            <span className={styles.list_cont_text}>109</span>
                        </div>
                    </div>
                    <div className={styles.list_item}>
                        <div className={styles.list_title}>运行异常</div>
                        <div className={styles.list_cont}>
                            <span
                                className={`${styles.list_cont_text} ${styles.list_count_text_red}`}
                            >
                                17
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={styles.numerical_statistics_right}
                style={{
                    justifyContent:
                        alarm_fault_data.length === 1
                            ? "center"
                            : "space-between",
                }}
            >
                {alarm_fault_data.map((u) => {
                    return (
                        <div
                            key={u.name}
                            className={styles.alarm_fault}
                            style={{ ...u.style }}
                        >
                            <Title
                                main_style={{ color: u.style.color }}
                                sub_style={{
                                    background: "none",
                                    WebkitTextFillColor: "#fff",
                                }}
                                main_title={u.value}
                                subtitle={u.name}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NumericalStatistics;
