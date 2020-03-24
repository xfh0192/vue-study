<template>
    <div>
        <h3 :style="{'text-indent': indent + 'em'}">{{data.name}}</h3>
        <!-- 有条件嵌套 -->
        <template v-if="data.children">
            <tree-node v-for="row in data.children" :key="row.name" :data="row" :level="level+1"></tree-node>
        </template>
    </div>
</template>

<script>
export default {
    name: 'TreeNode',   // name对递归组件来说是必要的
    props: {
        data: {
            type: Object,
            required: true,
        },
        level: {
            type: Number,
            default: 0,
        }
    },
    computed: {
        indent() {
            return this.level * 2;
        }
    }
}
</script>

<style>

</style>