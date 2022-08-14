<template>
    <nav>
        <router-link to="/" class="logo">

        </router-link>
        <router-link class="btn" v-if="$store.state.login" to="/usuario">
            {{name}}
        </router-link>
        <router-link  v-else class="btn" to="/login">login</router-link>
    </nav>

</template>

<script>
export default {
    name: "TheHeader",
    computed: {
        name() {
            return this.$store.state.usuario.name;
        }
    } 
}
</script>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
    padding: 10px 0;
}

.logo img {
    width: 90px;
}
</style>