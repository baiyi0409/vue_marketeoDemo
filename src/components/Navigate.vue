<template>
    <div class="navigate">
        <div class="navigate-title">
            <SvgIcon name="logo" color="#3b81f6" style="width: 32px; height: 32px;" />
            Marketeo
        </div>

        <div class="navigate-menu">
            <p>Menu</p>
            <div>
                <RouterLink v-for="link in navLinks" :to="link.path" :key="link.name">
                    <SvgIcon :name="link.name.toLowerCase()" color="currentColor" style="width: 24px; height: 24px;" />
                    {{ link.name }}
                </RouterLink>
            </div>
        </div>

        <div class="navigate-settings">
            <RouterLink to="/settings">
                <SvgIcon name="settings" style="width: 24px; height: 24px;" />
                Settings
            </RouterLink>
            <RouterLink to="/login" style="color: #e73f3f;">
                <SvgIcon name="logout" color="currentColor" style="width: 24px; height: 24px;" />
                Log out
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '../components/SvgIcon.vue'

import { reactive } from 'vue';
// 导航栏数据
const navLinks = reactive([
    { name: 'Home', path: '/' },
    { name: 'Customers', path: '/customer' },
    { name: 'Orders', path: '/order' },
]);

</script>


<style scoped lang="less">
.navigate {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 250px;
    height: 100%;
    background-color: white;
    border-radius: 10px;

    &-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        font-weight: 600;
    }

    &-menu {
        display: flex;
        flex-direction: column;
        gap: 10px;

        p {
            color: #c9cacc;
        }

        div {
            display: flex;
            flex-direction: column;
            gap: 8px;

            a {
                display: flex;
                align-items: center;
                gap: 15px;
                text-decoration: none;
                color: #333;
                font-weight: 500;
                padding: 10px 16px;
                border-radius: 6px;
                transition: all 0.2s ease;

                &:hover {
                    background-color: #f0f2f5;
                }

                &.router-link-active {
                    background-color: #e6f2ff;
                    color: #1890ff;
                    font-weight: 600;
                }
            }
        }
    }

    &-settings {
        margin-top: auto;
        font-size: 16px;

        a {
            display: flex;
            align-items: center;
            gap: 15px;
            text-decoration: none;
            color: #333;
            font-weight: 500;
            padding: 10px 16px;
            border-radius: 6px;
            transition: all 0.2s ease;

            &:hover {
                background-color: #f0f2f5;
            }

            &.router-link-active {
                background-color: #e6f2ff;
                color: #1890ff;
                font-weight: 600;
            }
        }
    }
}
</style>