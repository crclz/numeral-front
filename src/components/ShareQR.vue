<template>
    <div>
        <vue-qr :correctLevel="3" :autoColor="false" colorDark="#000000" :logoSrc="logoSrc" :text="codeUrl" :size="95" :margin="0" :logoMargin="3"></vue-qr>
    </div>
</template>

<script>
    import VueQr from 'vue-qr';

    export default {
        name: "ShareQR",
        components: {
            VueQr
        },
        props: ['shareUrl'],
        data() {
            return {
                logoSrc: require('../assets/logo_mini_64x.png'),
                codeUrl: ''
            }
        },
        created() {
            this.codeUrl = this.shareUrl;
        }
    }
</script>

<style scoped>

</style>