<template>
    <h1>MisCompras Vue</h1>
</template>

<script>
export default {
    name: 'MisCompras',
    methods: {
        getProjects() {
            return [{ id: '1', title: "hola" }]
        }
    }
}
</script>

<style scoped>
h1 {
    color: green;
}
</style>