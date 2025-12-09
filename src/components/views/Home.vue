<template>
    <div class="home">
        <div class="home-header">
            <!-- 搜索框 -->
            <div class="home-header-search">
                <input type="text" v-model="searchText" placeholder="Search" />
                <button type="button" @click="handleSearch">
                    <SvgIcon name="search" color="#ffffff" style="width: 24px; height: 24px;" />
                </button>
            </div>
            <div class="home-header-info">
                <button type="button">
                    <SvgIcon name="mail" color="#68686b" style="width: 24px; height: 24px;" />
                </button>
                <button type="button">
                    <SvgIcon name="message" color="#68686b" style="width: 20px; height: 20px;" />
                </button>

                <!-- 分隔线 -->
                <div class="divider"></div>
                <!-- 用户信息 -->
                <div class="home-header-usercard">
                    <img src="" class="avatar" />
                    <div class="home-header-userinfo">
                        <div class="name">Michelle Arnold</div>
                        <div class="title">Sales manager</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="home-content">
            <div class="home-content-left">
                <!-- 收入区域 -->
                <div class="home-content-revenue">
                    <div class="content-title">
                        <p>Total revenue</p>
                    </div>
                    <!-- 收入数据 -->
                    <div class="revenue-data">
                        <div>
                            <span>{{ formattedTotalRevenue }}</span>
                            <span>{{ formattedPercentage }}</span>
                        </div>
                        <p>Gained {{ formattedRevenue }} this month</p>
                    </div>
                    <!-- 折线图 -->
                    <div ref="revenueChart" style="width: 100%; height: 100%;"></div>
                </div>

                <div class="home-content-stats">
                    <!-- 售出区域 -->
                    <div class="home-content-sold">
                        <div class="content-title">
                            <p>Product sold</p>
                        </div>
                        <!-- 饼图 -->
                        <div ref="soldChart" style="width: 100%; height: 100%;"></div>
                    </div>

                    <!-- 净收入区域 -->
                    <div class="home-content-income">
                        <div class="content-title">
                            <p>Total income</p>
                        </div>
                        <div class="income-data">
                            <p>$215,835.89</p>
                            <p>24% increase compared to last week</p>
                        </div>
                    </div>
                </div>

                <!-- 订单区域 -->
                <div class="home-content-orders">
                    <div class="content-title">
                        <p>Recent order</p>
                    </div>
                    <!-- 表格 -->
                    <div class="orders-table">
                        <div class="table-header">
                            <span>#</span>
                            <span>Product</span>
                            <span>Date</span>
                            <span>Status</span>
                            <span>Price</span>
                            <span>Customer</span>
                        </div>

                        <div v-for="item in orderList" key="item.id" class="table-row">
                            <span>{{ item.id }}</span>
                            <div class="product-cell">
                                <span>{{ item.productName }}</span>
                            </div>
                            <span>{{ item.date }}</span>
                            <span class="status received">{{ item.status }}</span>
                            <span>${{ item.price }}</span>
                            <span>{{ item.customer }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="home-content-right">
                <!-- Top 产品 -->
                <div class="home-content-products">
                    <div class="content-title">
                        <p>Top products</p>
                    </div>
                </div>
                <!-- 购买占比 -->
                <div class="home-content-traffic">
                    <div class="content-title">
                        <p>Traffic</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import SvgIcon from '../SvgIcon.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue';
import * as echarts from 'echarts'
import api from '@/api/api';
import legendFilter from 'echarts/types/src/component/legend/legendFilter.js';
import { ITEM_STYLE_KEY_MAP } from 'echarts/types/src/model/mixin/itemStyle.js';

// 搜索框文本
const searchText = ref('');
const handleSearch = () => {
    const value = searchText.value.trim()
    if (value) {
        alert(`你搜索的是：${value}`)
    } else {
        alert('请输入搜索内容！')
    }
};

const revenueData = ref(null) // 初始为 null，表示未加载
const fetchRevenueData = async () => {
    try {
        const data = await api.getRevenueData()
        console.log('收入数据：', data)
        revenueData.value = data
    } catch (error) {
        console.error('获取收入数据失败：', error)
    }
}

// 格式化货币（带千分位和两位小数）
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value)
}

// 计算属性
const formattedTotalRevenue = computed(() => {
    return revenueData.value ? formatCurrency(revenueData.value.totalRevenue) : '$0.00'
})
const formattedRevenue = computed(() => {
    if (!revenueData.value) return '$0.00'
    return formatCurrency(revenueData.value.revenue)
})
const formattedPercentage = computed(() => {
    return revenueData.value ? `${revenueData.value.totalPercentage}%` : '0%'
})

//收入图表
const revenueChart = ref<HTMLElement | null>(null);
let myRevenueChart = null;

// 初始化图表
const initRevenueChart = () => {
    myRevenueChart = echarts.init(revenueChart.value)
    // 配置项对象
    const option = {
        //取消边距
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '20px'
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
            borderRadius: 8,
            padding: [8, 12],
            axisPointer: {
                type: 'line'
            },
            formatter(params) {
                if (Array.isArray(params)) {
                    // axis 模式：params 是多个数据项的数组
                    const date = params[0].name; // x 轴名称
                    let html = `${date}<br/>`;
                    params.forEach(item => {
                        //html += `${item.marker} ${item.seriesName}: $${item.value}<br/>`;
                        html += `${item.marker} ${item.value}k<br/>`;
                    });
                    return html;
                } else {
                    // item 模式
                    return `${params.name}: ${params.value}k`;
                }
            }
        },
        xAxis:
        {
            axisLabel: {
                formatter: 'Apr {value}'
            },
            //x轴左右空白
            boundaryGap: false,
            data: ['7', '8', '9', '10', '11', '12', '13', '14']
        },
        yAxis:
        {
            //刻度标签
            axisLabel: {
                formatter: '{value}K'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    width: 1.2
                }
            }

        },
        series: [{
            type: 'line',
            data: [38, 57, 40, 63, 42, 20, 60, 40],
            smooth: true,
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(59, 129, 246, 0.6)' },   // 上方：较深/不透明
                    { offset: 1, color: 'rgba(255, 255, 255, 0.2)' }  // 下方：接近白色 + 半透明
                ])
            }
        }]
    }
    //使用配置
    myRevenueChart.setOption(option)
}
//售出图表
const soldChart = ref<HTMLElement | null>(null);
let mySoldChart = null;

const initSoldChart = () => {
    mySoldChart = echarts.init(soldChart.value);
    const option = {
        // title: {
        //     text: 'April 2038',
        //     top: '0%',
        //     left: '0%',
        // },
        tooltip: {
        },
        legend: {
            orient: 'vertical',
            left: '0%',
        },
        series: [
            {
                left: '50%',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                //间隔角度
                padAngle: 5,
                itemStyle: {
                    //圆角
                    borderRadius: 6
                },
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Stools', itemStyle: { color: '#ffbd0a' } },
                    { value: 735, name: 'Sofas', itemStyle: { color: '#fb5506' } },
                    { value: 580, name: 'Chairs', itemStyle: { color: '#ff006d' } },
                    { value: 484, name: 'Tables', itemStyle: { color: '#7f33ea' } },
                ]
            }
        ]
    };
    mySoldChart.setOption(option);
}

//订单数据
const orderList = ref(null);
const fetchOrderList = async () => {
    try {
        const data = await api.getOrderList()
        console.log('收入数据：', data)
        orderList.value = data
    } catch (error) {
        console.error('获取收入数据失败：', error)
    }
}

// 窗口大小变化时调整图表尺寸
const resizeChart = () => {
    myRevenueChart?.resize()
    mySoldChart?.resize()
}

// 生命周期钩子
onMounted(() => {
    fetchRevenueData();
    initRevenueChart();
    initSoldChart();
    fetchOrderList();
    // 监听窗口大小变化事件以支持响应式
    window.addEventListener('resize', resizeChart);

})

onUnmounted(() => {
    if (myRevenueChart) {
        window.removeEventListener('resize', resizeChart)
        myRevenueChart.dispose() // 销毁实例
    }
})
</script>

<style scoped lang="less">
.home {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        width: 100%;
        background-color: white;
        border-radius: 10px;
        padding: 12px;

        &-search {
            display: flex;
            align-items: center;

            input:first-child {
                width: 400px;
                height: 30px;
                border-radius: 10px;
                border: none;
                outline: none;
                padding: 5px 10px;
                font-size: 16px;
                background-color: #eff1f6;
            }

            button {
                width: 40px;
                height: 40px;
                margin-left: 10px;
                border: none;
                border-radius: 10px;
                background-color: #3b81f6;
                cursor: pointer;
            }
        }

        &-info {
            display: flex;
            align-items: center;
            gap: 10px;

            button {
                width: 40px;
                height: 40px;
                border: none;
                border-radius: 10px;
                background-color: #eff1f6;
                cursor: pointer;
            }
        }

        &-usercard {
            display: flex;
            align-items: center;
            gap: 8px;

            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #ccc;
            }
        }

        &-userinfo {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .name {
                font-size: 14px;
                font-weight: 600;
            }

            .title {
                font-size: 12px;
                color: #a2a3a7;
            }
        }
    }


    &-content {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        gap: 10px;

        &-left {
            display: flex;
            gap: 10px;
            flex: 7;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }

        &-right {
            display: flex;
            gap: 10px;
            flex: 3;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }

        .content-title {
            display: flex;

            p {
                font-size: 18px;
                font-weight: 600;
            }
        }


        &-revenue {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px 15px;
            background-color: white;
            border-radius: 10px;
            height: 45%;

            .revenue-data {
                display: flex;
                flex-direction: column;
                gap: 12px;

                div {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    span:first-child {
                        font-size: 32px;
                        font-weight: 500;
                    }

                    span:last-child {
                        font-size: 12px;
                        font-weight: 600;
                        color: #52c41a;
                        border: 1px solid #52c41a;
                        padding: 6px 8px;
                        border-radius: 10px;
                    }
                }

                p {
                    font-size: 14px;
                    color: #a8a8a8;
                }
            }
        }


        &-stats {
            display: flex;
            gap: 10px;
            width: 100%;
            height: 20%;

            .home-content-sold,
            .home-content-income {
                display: flex;
                flex-direction: column;
                gap: 15px;
                padding: 20px 15px;
                background-color: white;
                border-radius: 10px;
                width: 50%;
                height: 100%;
            }

            .income-data {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;

                p:first-child {

                    font-size: 32px;
                    font-weight: 500;
                }

                p:last-child {
                    margin-top: auto;
                    font-size: 14px;
                    color: #a8a8a8;
                }
            }
        }

        &-orders {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px 15px;
            background-color: white;
            border-radius: 10px;
            height: 35%;

            .orders-table {
                width: 100%;
                border-collapse: collapse;
                //border-top: 1px solid #eee;
            }

            .table-header {
                display: grid;
                grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr 1fr;
                gap: 16px;
                padding: 12px 0;
                font-size: 16px;
                color: #666;
                //text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 600;
                border-bottom: 1px solid #eee;
            }

            .table-row {
                display: grid;
                grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr 1fr;
                gap: 16px;
                padding: 25px 0;
                border-bottom: 1px solid #eee;
                align-items: center;
                font-weight: 600;
            }

            .table-row:last-child {
                border-bottom: none;
            }

            .product-cell {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .product-cell img {
                width: 32px;
                height: 32px;
                object-fit: cover;
                border-radius: 4px;
            }

            .status {
                padding: 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }

            .status.received {
                background: #e8f5e8;
                color: #2e7d32;
                border: 1px solid #c8e6c9;
            }
        }

        &-products,
        &-traffic {
            padding: 20px 15px;
            background-color: white;
            border-radius: 10px;
            height: 50%;
        }
    }
}

.divider {
    width: 2px;
    height: 24px;
    background-color: #eff1f6; // 浅灰色，柔和不突兀
}
</style>