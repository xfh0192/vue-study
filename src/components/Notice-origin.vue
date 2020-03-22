<template>
    <div>
        notice
        title - {{title}}
        message - {{message}}
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        message: String,
        duration: {
            type: Number,
            default: 2000,
        },
    },
    data() {
        return {
            showNotice: false,      
        }
    },
    methods: {
        show() {
            this.showNotice = true;
            setTimeout(() => {
                this.hide()
            }, this.duration);
        },
        hide() {
            this.showNotice = false;
            if (this.remove) {
                this.remove()
            } else {
                document.body.removeChild(this.$el);
                this.$destroy()
            }
        }
    },
    mounted() {
    }
}
</script>

<style>

</style>