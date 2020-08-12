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
        data() {
            return {
                logoSrc: require('../assets/logo_mini_64x.png'),
                codeUrl: 'http://localhost:8080/#/readFile/79170782113792'
            }
        }
    }
</script>

<style scoped>

</style>