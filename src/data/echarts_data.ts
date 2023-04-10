import * as echarts from "echarts";

interface category {
    name: string;
    value: number;
    [key: string]: any;
}

export const host_operation_option: echarts.EChartsOption = {
    tooltip: {
        trigger: "axis",
    },
    legend: {
        right: 6,
        icon: "rect",
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 40,
        textStyle: {
            fontSize: 14,
            color: "#fff",
        },
        data: [
            {
                name: "主机CPU使用率",
                itemStyle: {
                    color: "#5494FF",
                },
            },
            {
                name: "主机CPU争用",
                itemStyle: {
                    color: "#3FFFF5",
                },
            },
        ],
    },
    grid: {
        top: "16%",
        left: "50px",
        right: 0,
        bottom: "3%",
        containLabel: true,
        show: true,
        borderColor: "transparent",
        backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: "rgba(13, 88, 166, 0.20)",
            },
            {
                offset: 1,
                color: "rgba(13, 88, 166, 0)",
            },
        ]),
    },
    xAxis: [
        {
            show: true,
            axisTick: {
                show: false,
            }, //关闭x轴刻度
            axisLabel: {
                //x轴文字设置
                color: "#fff",
                fontSize: 14,
                fontFamily: "PingFangSC-Regular, PingFang SC",
            },
            axisLine: {
                //x轴线条类型
                lineStyle: {
                    color: "rgba(45, 155, 255, 1)",
                    width: 1,
                },
            },
            type: "category",
            // boundaryGap: false,
            data: [
                "00",
                "02",
                "04",
                "06",
                "08",
                "10",
                "12",
                "14",
                "16",
                "18",
                "20",
                "22",
            ],
        },
    ],
    yAxis: [
        {
            max: 100,
            // splitArea:{
            //     show:true,
            //     areaStyle:{
            //         color:['rgba(13, 88, 166, 0.20)']
            //     }
            // },
            axisLabel: {
                color: "#fff",
                fontSize: 14,
                fontFamily: "PingFangSC-Regular, PingFang SC",
                formatter: "{value}%",
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(45, 155, 255, 1)",
                },
            },
            type: "value",
        },
    ],
    series: [
        {
            name: "主机CPU使用率",
            type: "line",
            smooth: true, //平滑曲线
            showSymbol: false, // 是否显示线条节点，false表示 只有在hover时才显示
            lineStyle: {
                width: 2,
                color: "rgba(112, 166, 255, 1)",
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: "rgba(83, 168, 255, 0.4)",
                    },
                    {
                        offset: 1,
                        color: "rgba(83, 168, 255, 0)",
                    },
                ]),
            },
            data: [20, 60, 12, 42, 46, 50, 14, 15, 45, 42, 15, 16],
        },
        {
            name: "主机CPU争用",
            type: "line",
            smooth: true, //平滑曲线
            showSymbol: false, // 是否显示线条节点，false表示 只有在hover时才显示
            lineStyle: {
                width: 2,
                color: "rgba(63, 255, 245, 1)",
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: "rgba(69, 255, 228, 0.24)",
                    },
                    {
                        offset: 1,
                        color: "rgba(69, 255, 228, 0)",
                    },
                ]),
            },

            data: [30, 50, 22, 32, 26, 40, 20, 21, 35, 22, 18, 14],
        },
    ],
};
export const get_usage_rate = (data: {
    category: category[];
    limit_color: number;
}): echarts.EChartsOption => {
    let { category = [], limit_color = 80 } = data || {};
    let totals: number[] = []; // 数据总数
    let total = 100;
    let names: string[] = [];
    category.forEach((value) => {
        totals.push(total);

        if (value.value < limit_color) {
            value.itemStyle = {
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                    {
                        offset: 0,
                        color: "rgba(53, 126, 145, 1)",
                    },
                    {
                        offset: 1,
                        color: "rgba(28, 63, 117, 1)",
                    },
                ]),
            };
            value.label = {
                color: "#6AFFBD",
            };
        } else {
            value.itemStyle = {
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                    {
                        offset: 0,
                        color: "rgba(145, 53, 53, 1)",
                    },
                    {
                        offset: 1,
                        color: "rgba(28, 63, 117, 1)",
                    },
                ]),
            };
            value.label = {
                color: "#FF9595",
            };
        }

        names.push(value.name);
    });

    return {
        xAxis: {
            max: total,
            splitLine: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        grid: {
            left: 169,
            top: 8, // 设置条形图的边距
            right: 30,
            bottom: 12,
        },
        yAxis: [
            {
                type: "category",
                inverse: true,
                data: names,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    fontSize: 20,
                    color: "#fff",
                    margin: 30,
                },
            },
        ],
        series: [
            {
                // 内
                type: "bar",
                barWidth: 32,
                legendHoverLink: false,
                silent: true,
                label: {
                    show: true,
                    position: "insideRight",
                    formatter: "{c}%",
                    color: "#fff",
                    fontSize: 22,
                    textShadowColor: "rgba(0,0,0,0.5)",
                    textShadowBlur: 4,
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 2,
                },
                data: category,
                z: 1,
                animationEasing: "elasticOut",
            },
            {
                name: "外框",
                type: "bar",
                barGap: "-100%",
                data: totals,
                barWidth: 32,
                itemStyle: {
                    color: "rgba(20, 47, 90, 0.60)", // 填充色
                },
                z: 0,
            },
        ],
    };
};

export const get_safety_option = (data: {
    category: category[];
    limit_color: number;
}): echarts.EChartsOption => {
    let { category = [], limit_color = 80 } = data || {};
    let _values: any[] = [];
    let values: number[] = [];
    let names: string[] = [];
    let list: number[] = [];
    if (category.length > 0) {
        let obj = {
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: "rgba(255, 88, 88, 1)",
                    },
                    {
                        offset: 0.5,
                        color: "rgba(124, 201, 255, 1)",
                    },
                    {
                        offset: 1,
                        color: "rgba(0, 42, 72, 1)",
                    },
                ]),
            },
        };
        list = category.map(() => {
            return 100;
        });
        _values = category.map((u) => {
            values.push(u.value);
            names.push(u.name);
            if (u.value >= limit_color) {
                return {
                    ...obj,
                    value: u.value,
                };
            } else {
                return u.value;
            }
        });
    }
    return {
        title: {
            text: "高危攻击数24小时变化趋势",
            textStyle: {
                fontWeight: 600,
                color: "#FFFFFF",
                fontSize: 20,
            },
        },
        // backgroundColor: '#031d33',
        animation: true,
        grid: {
            top: "20%",
            bottom: "15%",
            right: "5%",
        },
        xAxis: {
            data: names,
            axisLine: {
                show: true, //隐藏X轴轴线,
                lineStyle: {
                    color: "#2D9BFF",
                    width: 1,
                },
            },
            axisTick: {
                show: false, //隐藏X轴轴线
            },
            //   splitLine: {
            //     show: true,
            //     lineStyle: {
            //       color: "rgba(77, 128, 254, 0.2)",
            //       width: 2
            //     }
            //   },
            axisLabel: {
                show: true,
                margin: 6,
                fontSize: 14,
                color: "#fff", //X轴文字颜色
            },
        },
        yAxis: [
            {
                type: "value",
                gridIndex: 0,
                min: 0,
                max: 100,
                // interval: 25,
                // splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(45, 155, 255,0.2)",
                        width: 1,
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(77, 128, 254, 0.2)",
                    },
                },
                axisLabel: {
                    show: true,
                    margin: 14,
                    fontSize: 14,

                    color: "#fff",
                },
            },
        ],
        series: [
            {
                name: "设备在线率",
                type: "bar",
                barWidth: 24,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(124, 201, 255, 1)",
                        },
                        {
                            offset: 1,
                            color: "rgba(0, 42, 72, 1)",
                        },
                    ]),
                },
                data: _values,
                z: 10,
                zlevel: 0,
            },
            {
                // 分隔
                type: "pictorialBar",
                itemStyle: {
                    color: "#122742",
                },
                symbolRepeat: "fixed",
                symbolMargin: 2,
                symbol: "rect",
                symbolClip: true,
                symbolSize: [24, 2],
                symbolPosition: "start",
                symbolOffset: [0, 0],
                data: values,
                barWidth: 2,
                z: 0,
                zlevel: 1,
            },
            {
                name: "外框",
                type: "bar",
                barGap: "-66%", // 设置外框粗细
                data: list,
                barWidth: 16,
                itemStyle: {
                    color: "transparent", // 填充色
                    // barBorderRadius: 0, //圆角半径
                },
                label: {
                    // 标签显示位置
                    show: false,
                    position: "top", // insideTop 或者横向的 insideLeft
                },
                z: 0,
            },
        ],
    };
};

export const work_order_trends: echarts.EChartsOption = {
    title: {
        text: "24小时工单趋势",
        textStyle: {
            fontWeight: 600,
            color: "#FFFFFF",
            fontSize: 20,
        },
    },
    tooltip: {
        trigger: "axis",
    },

    grid: {
        top: 50,
        left: 0,
        right: 20,
        bottom: "3%",
        containLabel: true,
        show: true,
        borderColor: "transparent",
        backgroundColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: "rgba(13, 88, 166, 0.20)",
            },
            {
                offset: 1,
                color: "rgba(13, 88, 166, 0)",
            },
        ]),
    },
    xAxis: [
        {
            show: true,
            axisTick: {
                show: false,
            }, //关闭x轴刻度
            axisLabel: {
                //x轴文字设置
                color: "#fff",
                fontSize: 14,
                fontFamily: "PingFangSC-Regular, PingFang SC",
            },
            axisLine: {
                //x轴线条类型
                lineStyle: {
                    color: "rgba(45, 155, 255, 1)",
                    width: 1,
                },
            },
            type: "category",
            // boundaryGap: false,
            data: [
                "00",
                "02",
                "04",
                "06",
                "08",
                "10",
                "12",
                "14",
                "16",
                "18",
                "20",
                "22",
            ],
        },
    ],
    yAxis: [
        {
            max: 100,
            // splitArea:{
            //     show:true,
            //     areaStyle:{
            //         color:['rgba(13, 88, 166, 0.20)']
            //     }
            // },
            axisLabel: {
                color: "#fff",
                fontSize: 14,
                fontFamily: "PingFangSC-Regular, PingFang SC",
                formatter: "{value}%",
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(45, 155, 255, 1)",
                },
            },
            type: "value",
        },
    ],
    series: [
        {
            name: "工单趋势",
            type: "line",
            smooth: true, //平滑曲线
            showSymbol: false, // 是否显示线条节点，false表示 只有在hover时才显示
            lineStyle: {
                width: 2,
                color: "rgba(112, 166, 255, 1)",
            },
            itemStyle: {
                color: "#5494FF",
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: "rgba(83, 168, 255, 0.4)",
                    },
                    {
                        offset: 1,
                        color: "rgba(83, 168, 255, 0)",
                    },
                ]),
            },
            data: [20, 60, 12, 42, 46, 50, 14, 15, 45, 42, 15, 16],
        },
    ],
};

/**
 *网络
 *  */
export const get_network_option = (data: {
    value: number;
    color: string;
    textColor: string;
    type: string;
}): echarts.EChartsOption => {
    function hexToRgba(hex: string, opacity: number): string {
        return (
            "rgba(" +
            parseInt("0x" + hex.slice(1, 3)) +
            "," +
            parseInt("0x" + hex.slice(3, 5)) +
            "," +
            parseInt("0x" + hex.slice(5, 7)) +
            "," +
            opacity +
            ")"
        );
    }
    const {
        value = 0,
        color = "#76B8FF",
        textColor = "#40BCFF",
        type = "text",
    } = data || {};

    return {
        grid: {
            bottom: "20%",
        },
        xAxis: {
            data: [],
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
        },
        series: [
            {
                name: "",
                type: "pictorialBar",
                symbolSize: [100, 30],
                symbolOffset: [-10, -10],
                z: 12,
                data: [
                    {
                        name: "",
                        value: value,
                        symbolPosition: "end",
                        itemStyle: {
                            color: hexToRgba(color, 0.5), //圆柱顶部颜色
                        },
                    },
                ],
            },
            {
                name: "",
                type: "pictorialBar",
                symbolSize: [100, 36],
                symbolOffset: [-10, 16],
                z: 12,
                data: [
                    {
                        name: "",
                        value: value,

                        itemStyle: {
                            color: hexToRgba(color, 1), //圆柱底部颜色
                        },
                    },
                ],
            },
            {
                type: "bar",
                barWidth: 100,
                z: 16,
                data: [
                    {
                        name: "",
                        value: value,
                        label: {
                            show: true,
                            formatter:
                                type === "percentage" ? "{c}" + "%" : "{c}",
                            position: "top",
                            // distance: 4,
                            color: hexToRgba(textColor, 1), //柱子对应数值颜色
                            fontSize: 32,
                            fontWeight: "bold",
                        },
                        itemStyle: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                type: "linear",
                                global: false,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: hexToRgba(color, 0),
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(color, 1), //底部渐变颜色
                                    },
                                ],
                            },
                        },
                    },
                ],
            },

            //往上是内部柱状图
            //往下是外部柱状图

            {
                name: "",
                type: "pictorialBar",
                symbolSize: [140, 45],
                symbolOffset: [-10, -20],
                z: 12,
                data: [
                    {
                        name: "",
                        value: "100",

                        symbolPosition: "end",
                        itemStyle: {
                            color: hexToRgba(color, 0.1), //圆柱顶部颜色
                        },
                    },
                ],
            },
            {
                name: "",
                type: "pictorialBar",
                symbolSize: [150, 58],
                symbolOffset: [-10, 30],
                z: 12,
                data: [
                    {
                        name: "",
                        value: "100",

                        itemStyle: {
                            color: hexToRgba(color, 0.3), //圆柱底部颜色
                        },
                    },
                ],
            },
            {
                name: "",
                type: "pictorialBar",
                symbolSize: [150, 58],
                symbolOffset: [-10, 40],
                z: 11,
                data: [
                    {
                        name: "",
                        value: "100",

                        itemStyle: {
                            color: "transparent",
                            borderColor: hexToRgba(color, 1), //底部内圆圈颜色
                            borderWidth: 30,
                        },
                    },
                ],
            },
            {
                name: "",
                type: "pictorialBar",
                symbolSize: [200, 80],
                symbolOffset: [-10, 48],
                z: 10,
                data: [
                    {
                        name: "",
                        value: "100",

                        itemStyle: {
                            color: "transparent",
                            borderColor: hexToRgba(color, 1), //底部外圆圈颜色
                            borderType: "dashed",
                            borderWidth: 2,
                        },
                    },
                ],
            },
            {
                type: "bar",
                silent: true,
                barWidth: 140,
                barGap: "-120%",
                z: 12,
                data: [
                    {
                        name: "",
                        value: "100",
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            color: {
                                x: 1,
                                y: 1,
                                x2: 1,
                                y2: 0,
                                type: "linear",
                                global: false,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: hexToRgba(color, 0),
                                    },
                                    {
                                        offset: 0.3,
                                        color: hexToRgba(color, 0.1),
                                    },
                                    {
                                        offset: 0.5,
                                        color: hexToRgba(color, 0.1),
                                    },
                                    {
                                        offset: 0.8,
                                        color: hexToRgba(color, 0.1),
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(color, 0), //底部渐变颜色
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    };
};

export const get_lineBandwidth = (data: {
    category: category[];
    limit_color: number;
}): echarts.EChartsOption => {
    let { category = [], limit_color = 80 } = data || {};
    let totals: number[] = []; // 数据总数
    let total = 100;
    let datas: category[] = [];
    let names: string[] = [];
    category.forEach((value) => {
        names.push(value.name);
        totals.push(total);
        datas.push(value);
    });

    return {
        // backgroundColor: '#071347',
        title: {
            text: "网络线路带宽",
            left: 40,
            textStyle: {
                fontWeight: 600,
                color: "#FFFFFF",
                fontSize: 20,
            },
        },
        legend: {
            show: true,
            right: 28,
            icon: "rect",
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 20,
            textStyle: {
                fontSize: 14,
                color: "#fff",
            },
            data: [
                {
                    name: "使用百分比",
                    itemStyle: {
                        color: "#1EE0FF",
                    },
                },
                {
                    name: "总带宽",
                    itemStyle: {
                        color: "rgba(30, 166, 255, 0.20)",
                    },
                },
            ],
        },
        xAxis: {
            max: total,
            splitLine: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        grid: {
            left: 106,
            top: 30, // 设置条形图的边距
            right: 120,
            bottom: 12,
        },
        yAxis: {
            inverse: true,
            data: names,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                color: "#fff",
                fontSize: 18,
            },
        },
        series: [
            {
                // 内
                name: "使用百分比",
                type: "bar",
                barWidth: 2,
                legendHoverLink: false,
                silent: true,
                itemStyle: {
                    color: function (params: any) {
                        const { value } = params;
                        if (value >= limit_color) {
                            return "#FA3636";
                        }
                        return "#1EE0FF";
                    },
                },
                data: category,
                z: 1,
                animationEasing: "elasticOut",
            },
            {
                // 外边框
                name: "",
                type: "pictorialBar",
                symbol: "rect",
                symbolBoundingData: total,
                itemStyle: {
                    color: "none",
                },
                label: {
                    formatter: (params: any) => {
                        const { data = {} } = params;
                        return `{a|  ${data.value}%}{f| / ${data.bandwidth}M}`;
                    },
                    fontSize: 14,
                    rich: {
                        a: {
                            color: "#1ECEFF",
                        },

                        f: {
                            color: "#ffffff",
                        },
                    },
                    position: "right",
                    distance: 0, // 向右偏移位置
                    show: true,
                },
                data: datas,
                z: 0,
                animationEasing: "elasticOut",
            },
            {
                name: "总带宽",
                type: "bar",
                barGap: "-300%",
                data: totals,
                barWidth: 11,
                itemStyle: {
                    color: "rgba(30, 166, 255, 0.2)", // 填充色
                },
                label: {
                    // 标签显示位置
                    show: false,
                    position: "top", // insideTop 或者横向的 insideLeft
                },
                z: 0,
            },
        ],
    };
};

export const get_level = (data: {
    text_data: string[];
    value: number;
    limit_color: number;
    shadow: boolean;
}): echarts.EChartsOption => {
    const {
        text_data = [],
        value = 0,
        limit_color = 80,
        shadow = false,
    } = data || {};
    const length = text_data.length;
    let top = ["16%", "center", "60.5%"];
    let font = [24, 40, 24];
    let color = [
        { offset: 0, color: "#2BA3FF" },
        { offset: 1, color: "#2BE5FF" },
    ];
    if (length === 2) {
        top = ["26%", "55%"];
        font = [18, 24];
    }
    if (value > limit_color) {
        color = [
            { offset: 0, color: "#FF822B" },
            { offset: 1, color: "#B53A3A" },
        ];
    }
    const titles = text_data.map((u, i) => {
        let obj = {
            text: u || "",
            left: "center",
            top: top[i],
            // fontWeight: i === 1 ? "bold" : "normal",

            textStyle: {
                fontWeight: i === 1 ? "bold" : "normal",
                color: "#fff",
                fontSize: font[i],
            },
        };
        return obj;
    });
    return {
        // backgroundColor: '#2b2a38',
        title: [...titles],
        color: ["#00488D"],
        series: [
            {
                name: "外阴影",
                type: "pie",
                // clockWise: true,
                radius: ["85%", "86%"],
                itemStyle: {},
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                data: [
                    {
                        value: 100,
                        name: "02",
                        itemStyle: {
                            shadowBlur: shadow ? 20 : 0,
                            shadowColor: "rgba(79, 178, 255, 0.50)",
                        },
                    },
                ],
            },
            {
                name: "内容",
                type: "pie",
                radius: ["82%", "90%"],
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                data: [
                    {
                        value: value,
                        name: "01",
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [...color]
                            ),
                        },
                    },
                    {
                        name: "02",
                        value: 100 - value,
                    },
                ],
            },
        ],
    };
};
