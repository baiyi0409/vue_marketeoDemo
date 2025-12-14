<template>
    <div class="combobox" ref="comboboxRef">
        <!-- 当前选中项 -->
        <div class="select" @click="toggle">
            <span>{{ currentLabel }}</span>
            <SvgIcon :name="isSelect ? 'up' : 'down'" color="currentColor" style="width: 18px; height: 18px;" />
        </div>

        <!-- 下拉选项 -->
        <div class=" items" v-show="isSelect">
            <span v-for="item in itemsData" :key="item" class="item" :class="{ active: item === modelValue }"
                @click="selectItem(item)">
                {{ item }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import SvgIcon from './SvgIcon.vue';

// 接收 v-model 值
const props = defineProps<{
    modelValue: string
    items: string[]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const isSelect = ref(false)
const comboboxRef = ref<HTMLDivElement | null>(null)

// 计算当前显示的文本
const currentLabel = computed(() => {
    return props.modelValue || (props.items.length > 0 ? props.items[0] : '请选择')
})

// 切换下拉
const toggle = () => {
    isSelect.value = !isSelect.value
}

// 选中某一项
const selectItem = (item: string) => {
    emit('update:modelValue', item)
    isSelect.value = false
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
    if (comboboxRef.value && !comboboxRef.value.contains(event.target as Node)) {
        isSelect.value = false
    }
}

// 监听 items 变化（可选）
const itemsData = computed(() => props.items)

// 生命周期
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="less">
.combobox {
    background-color: #eff1f6;
    width: 100px;
    height: 100%;
    border-radius: 15px;
    padding: 10px 12px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    color: #333;

    .select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        width: 100%;
        height: 100%;
        font-weight: 600;
    }
}

.items {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 5px;
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    padding: 8px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .item {
        padding: 6px 12px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #f0f4ff;
        }

        &.active {
            background-color: #cee0fe;
            font-weight: bold;
        }
    }
}
</style>