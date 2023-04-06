import * as echarts from "echarts";

export const option: echarts.EChartsOption = {
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        right:6,
        icon:'rect',
        itemWidth:8,
        itemHeight:8,
        itemGap:40,
        textStyle:{
            fontSize:14,
            color:'#fff',
        },
        data: [{
            name:'主机CPU使用率',

        },{
            name:'主机CPU争用'
        }]
    },
    grid: {
        top:'16%',
        left: '50px',
        right: 0,
        bottom: '3%',
        containLabel: true,
        show:true,
        borderColor:'transparent',
        backgroundColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: 'rgba(13, 88, 166, 0.20)'
            },
            {
                offset: 1,
                color: 'rgba(13, 88, 166, 0)'
            }
        ])
    },
    xAxis: [
        {
            show:true,
            axisTick:{
                show:false
            },//关闭x轴刻度
            axisLabel:{//x轴文字设置
                color:'#fff',
                fontSize:14,
                fontFamily:'PingFangSC-Regular, PingFang SC'
            },
            axisLine:{//x轴线条类型
                lineStyle:{
                    color:'rgba(45, 155, 255, 1)',
                    width:1
                }

            },
            type: 'category',
            // boundaryGap: false,
            data: ['00','02','04','06','08','10','12','14','16','18','20','22']
        }
    ],
    yAxis: [
        {
            max:100,
            // splitArea:{
            //     show:true,
            //     areaStyle:{
            //         color:['rgba(13, 88, 166, 0.20)']
            //     }
            // },
            axisLabel:{
                color:'#fff',
                fontSize:14,
                fontFamily:'PingFangSC-Regular, PingFang SC',
                formatter:"{value}%"
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'rgba(45, 155, 255, 1)'
                }
            },
            type: 'value'
        }
    ],
    series: [
        {
            name: '主机CPU使用率',
            type: 'line',
            smooth:true, //平滑曲线
            showSymbol:false, // 是否显示线条节点，false表示 只有在hover时才显示
            lineStyle:{
                width:2,
                color:'rgba(112, 166, 255, 1)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(83, 168, 255, 0.4)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(83, 168, 255, 0)'
                    }
                ])
            },
            data: [20,60,12,42,46,50,14,15,45,42,15,16]
        },
        {
            name: '主机CPU争用',
            type: 'line',
            smooth:true, //平滑曲线
            showSymbol:false, // 是否显示线条节点，false表示 只有在hover时才显示
            lineStyle:{
                width:2,
                color:'rgba(63, 255, 245, 1)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(69, 255, 228, 0.24)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(69, 255, 228, 0)'
                    }
                ])
            },

            data: [30,50,22,32,26,40,20,21,35,22,18,14]
        }
    ]
};
