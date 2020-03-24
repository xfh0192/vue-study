<template>
    <div>
        <tree-node :data="folderTree"></tree-node>
    </div>
</template>

<script>
import TreeNode from './TreeNode'

export default {
    components: {
        TreeNode,
    },
    data() {
        return {
            folderTree: {
                name: '文件夹1', 
                children: [
                    {name: '文件夹1-1', children: [{name: '文件夹1-1-1'}, {name: '文件夹1-1-2'}]},
                    {name: '文件夹1-2'}
                ]
          }
        }
    },
}
</script>

<style>

</style>