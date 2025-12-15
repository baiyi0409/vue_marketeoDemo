<template>
    <div class="login-container">
        <div class="login-card">
            <SvgIcon name="logo" color="#3b81f6" style="width: 48px; height: 48px;" />
            <h2>Marketeo 后台管理平台</h2>

            <form @submit.prevent="handleLogin" class="login-form">
                <div class="input-group">
                    <input type="text" v-model="username" placeholder="用户" class="input-field" />
                    <input type="password" v-model="password" placeholder="密码" class="input-field" />
                </div>

                <button type="submit" class="login-btn">登录</button>
            </form>


            <div class="links">
                <a href="/forget">忘记密码？</a>
                <a href="/register" class="link">注册账号</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.login-container {
    margin: auto;
    background-color: white;
    height: 480px;
    width: 420px;
    padding: 48px;
    border-radius: 12px;
}

.login-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100%;

    h2 {
        font-size: 24px;
    }
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}


.input-field {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    background-color: #f5f5f5;
    color: #333;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
        border-color: #409eff;
        box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
    }
}

.login-btn {
    width: 100%;
    padding: 12px;
    background-color: #3b81f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #3a8ee6;
    }
}

.links {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;

    a:first-child {
        color: #333;
    }
}

.link {
    color: #409eff;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: #66b1ff;
    }
}
</style>

<script setup lang="ts">
import SvgIcon from '../SvgIcon.vue';
import api from '@/api/api';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import { useUserStore } from '@/stores/'
const store = useUserStore()

const username = ref('');
const password = ref('');

const handleLogin = async () => {
    if (!username.value || !password.value) {
        alert('请输入用户名和密码');
        return;
    }

    const data = await api.Login(username.value, password.value);
    console.log('收入数据：', data)

    store.user = {
        username: data.username,
        password: data.password,
        token: data.token
    };
    store.isAuthenticated = !!store.user?.token

    console.log('userStore', store.user);
    router.push('/');
};
</script>
