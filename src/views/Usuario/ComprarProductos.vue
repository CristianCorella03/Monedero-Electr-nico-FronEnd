<template>
    <h1>ComprarProductos Vue</h1>
</template>

<script>
export default {
    name: 'ComprarProductos',
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