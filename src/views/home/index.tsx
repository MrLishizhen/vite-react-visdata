import styles from "./index.module.less";
import React, { useEffect } from "react";
import EchartsContainer from "@/components/ui/echarts";
import {
    host_operation_option,
    get_usage_rate,
    work_order_trends,
    get_safety_option,
    // get_network_option,
    get_lineBandwidth,
    get_level,
} from "@/data/echarts_data";
import { data } from "./data";
import Container from "@/views/home/components/container";
import NumericalStatistics from "@/views/home/components/numerical_statistics";
import Title from "@/components/ui/title";

const Home: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
    const alarm_fault_data = [
        {
            name: "告警数",
            value: "26",
            style: {
                color: "rgba(255, 56, 81, 1)",
            },
        },
        {
            name: "故障数",
            value: "26",
            style: {
                color: "rgba(255, 129, 56, 1)",
            },
        },
    ];
    const application_system_alarm_fault_data = [
        {
            name: "告警数",
            value: "26",
            style: {
                color: "rgba(255, 56, 81, 1)",
                width: 120,
            },
        },
    ];
    const server_usage_rate = get_usage_rate({
        category: [
            {
                name: "CPU使用率",
                value: 61,
            },
            {
                name: "内存使用率",
                value: 83,
            },
        ],
        limit_color: 80,
    });
    const storage_usage_rate = get_usage_rate({
        category: [
            {
                name: "内存使用率",
                value: 75,
            },
        ],
        limit_color: 80,
    });

    const application_system_usage_rate = get_usage_rate({
        category: [
            {
                name: "内存使用率",
                value: 75,
            },
        ],
        limit_color: 80,
    });

    const safety_option = get_safety_option({
        category: [
            { name: "00", value: 21 },
            { name: "02", value: 50 },
            { name: "04", value: 40 },
            { name: "06", value: 30 },
            { name: "08", value: 48 },
            { name: "10", value: 43 },
            { name: "12", value: 86 },
            { name: "14", value: 15 },
            { name: "16", value: 51 },
            { name: "18", value: 15 },
            { name: "20", value: 14 },
            { name: "22", value: 43 },
        ],
        limit_color: 80,
    });
    // const network_option = get_network_option({
    //     value: 0,
    //     color: "#76B8FF",
    //     textColor: "#40BCFF",
    //     type: "percentage",
    // });
    const lineBandwidth = get_lineBandwidth({
        category: [
            {
                name: "线路一",
                value: 60.1,
                bandwidth: 874,
            },
            {
                name: "线路二",
                value: 56.2,
                bandwidth: 778,
            },
            {
                name: "线路三",
                value: 42.7,
                bandwidth: 653,
            },
            {
                name: "线路四",
                value: 23.6,
                bandwidth: 852,
            },
            {
                name: "线路五",
                value: 18.3,
                bandwidth: 724,
            },
        ],
        limit_color: 80,
    });

    return (
        <div className={styles.home} style={style}>
            <div className={styles.map}>
                <div className={styles.round} />
                <div className={styles.title_box}>
                    <div className={styles.title_top}>
                        <Title
                            main_title="主机CPU争用"
                            subtitle="12％"
                            main_style={{ fontSize: 24, height: "30%" }}
                            sub_style={{
                                fontSize: 64,
                                height: "70%",
                                lineHeight: "normal",
                            }}
                        />
                    </div>
                    <div className={styles.title_bottom}>
                        <Title
                            main_title="主机CPU争用"
                            subtitle="12％"
                            main_style={{ fontSize: 24, width: "60%" }}
                            sub_style={{
                                fontSize: 32,
                                width: "40%",
                                textAlign: "left",
                            }}
                            style={{ flexDirection: "initial" }}
                        />
                    </div>
                </div>
                {data.map((u, i) => {
                    return (
                        <div
                            key={i}
                            className={styles.level_bar}
                            style={{ ...u.style }}
                        >
                            <EchartsContainer
                                echarts_option={get_level({
                                    ...u.echarts_data,
                                })}
                            />
                        </div>
                    );
                })}
            </div>
            {/*底部echarts图*/}
            <div className={styles.host_of_the_day}>
                <h3 className={styles.heading_level}>当日主机CPU运行情况</h3>
                <div className={styles.echarts_box}>
                    <EchartsContainer echarts_option={host_operation_option} />
                </div>
            </div>
            {/*服务器*/}
            <Container type={"server"} style={{ left: 823, top: 76 }}>
                <div className={styles.container_content}>
                    <NumericalStatistics
                        type={"server"}
                        title_data={{ main_title: "126", subtitle: "服务器" }}
                        alarm_fault_data={alarm_fault_data}
                    />
                    <div className={styles.echarts_box}>
                        <EchartsContainer echarts_option={server_usage_rate} />
                    </div>
                </div>
            </Container>

            {/*存储*/}
            <Container type={"storage"} style={{ right: 31, top: 76 }}>
                <div className={styles.container_content}>
                    <NumericalStatistics
                        type={"server"}
                        title_data={{ main_title: "126", subtitle: "存储" }}
                        alarm_fault_data={alarm_fault_data}
                    />
                    <div className={styles.echarts_box}>
                        <EchartsContainer echarts_option={storage_usage_rate} />
                    </div>
                </div>
            </Container>
            {/*网络*/}
            <Container type={"network"} style={{ left: 823, top: 403 }}>
                <div
                    className={`${styles.container_content} ${styles.network_content}`}
                >
                    <div className={styles.network_top}>
                        <div className={styles.network_top_left}>
                            {/* <EchartsContainer echarts_option={network_option} /> */}
                        </div>
                        <div className={styles.network_top_right}>
                            {/* <EchartsContainer
                                echarts_option={storage_usage_rate}
                            /> */}
                        </div>
                    </div>
                    <div className={styles.network_bottom}>
                        <EchartsContainer echarts_option={lineBandwidth} />
                    </div>
                </div>
            </Container>
            {/*应用系统*/}
            <Container
                type={"application_system"}
                style={{ right: 31, top: 403 }}
            >
                <div
                    className={`${styles.container_content} ${styles.network_content}`}
                >
                    <div className={styles.application_system_top}>
                        <NumericalStatistics
                            type={"server"}
                            title_data={{
                                main_title: "126",
                                subtitle: "应用系统",
                            }}
                            alarm_fault_data={
                                application_system_alarm_fault_data
                            }
                        />
                        <div className={styles.echarts_box}>
                            <EchartsContainer
                                echarts_option={application_system_usage_rate}
                            />
                        </div>
                    </div>
                    <div className={styles.application_system_bottom}>
                        <div className={styles.add_a_work_order}>
                            <Title
                                main_style={{
                                    background:
                                        "linear-gradient(180deg, #ffffff 0%, #5dacff 100%)",

                                    WebkitTextFillColor: "transparent",
                                    WebkitBackgroundClip: "text",
                                    fontWeight: "bold",
                                    fontSize: 28,
                                }}
                                sub_style={{
                                    background: "none",
                                    WebkitTextFillColor: "#fff",
                                }}
                                main_title={"1234"}
                                subtitle={"今日新增工单数"}
                            />
                        </div>
                        <div className={styles.work_order_trends}>
                            <EchartsContainer
                                echarts_option={work_order_trends}
                            />
                        </div>
                    </div>
                </div>
            </Container>
            {/*安全性*/}
            <Container
                type={"safety"}
                style={{
                    width: 1076,
                    height: 246,
                    minHeight: "auto",
                    left: 811,
                    top: 834,
                }}
            >
                <div
                    className={`${styles.container_content} ${styles.safety_content}`}
                >
                    <div className={styles.safety_left}>
                        <Title
                            main_title="安全漏洞数"
                            subtitle="6"
                            main_style={{ fontSize: 18 }}
                            sub_style={{
                                WebkitTextFillColor: "#FF4F58",
                                fontSize: 28,
                                background: "none",
                            }}
                            style={{
                                justifyContent: "center",
                                padding: "0 16px",
                            }}
                        />
                        <Title
                            style={{ width: 54 }}
                            main_title="安全性"
                            main_style={{ fontSize: 18 }}
                        />
                        <Title
                            main_title="恶意软件检测率"
                            subtitle="95％"
                            main_style={{ fontSize: 18 }}
                            sub_style={{
                                WebkitTextFillColor: "#00CB48",
                                fontSize: 28,
                                background: "none",
                            }}
                            style={{
                                justifyContent: "center",
                                padding: "0 16px",
                            }}
                        />
                    </div>
                    <div className={styles.safety_right}>
                        <EchartsContainer echarts_option={safety_option} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Home;
