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
                    <div class="revenue-title">
                        <p>Total revenue</p>
                        <!-- 收入数据 -->
                        <div>

                        </div>
                        <!-- 折线图 -->
                    </div>
                </div>

                <div class="home-content-stats">
                    <!-- 售出区域 -->
                    <div class="home-content-sold">
                        Sales
                    </div>

                    <!-- 净收入区域 -->
                    <div class="home-content-income">
                        Income
                    </div>
                </div>

                <!-- 订单区域 -->
                <div class="home-content-orders">
                    Orders
                </div>
            </div>

            <div class="home-content-right">
                <!-- Top 产品 -->
                <div class="home-content-products">
                    Top Products
                </div>
                <!-- 购买占比 -->
                <div class="home-content-traffic">
                    Traffic
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import SvgIcon from '../SvgIcon.vue'
import { ref } from 'vue';
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


        &-revenue {
            padding: 12px;
            background-color: white;
            border-radius: 10px;
            height: 45%;

            .revenue-title {
                display: flex;

                p {
                    font-size: 16px;
                    font-weight: 600;
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
                padding: 12px;
                background-color: white;
                border-radius: 10px;
                width: 50%;
            }
        }

        &-orders {
            padding: 12px;
            background-color: white;
            border-radius: 10px;
            height: 35%;
        }

        &-products,
        &-traffic {
            padding: 12px;
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