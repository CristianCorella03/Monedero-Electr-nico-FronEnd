<template>
    <h1>Template Vue</h1>
</template>

<script>
export default {
    name: 'TemplateVue',
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