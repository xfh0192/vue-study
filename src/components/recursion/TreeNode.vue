<template>
    <div>
        <h3>{{data.name}}</h3>
        <!-- 有条件嵌套 -->
        <!-- <template v-if="data.children">
            <tree-node v-for="row in data.children" :key="row.name" :data="row"></tree-node>
        </template> -->
    </div>
</template>

<script>
export default {
    name: 'TreeNode',   // name对递归组件来说是必要的
    props: {
        data: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style>

</style>