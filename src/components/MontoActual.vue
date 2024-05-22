<template>
    <section style="margin-left: 300px;">
        <h2>Monto Actual</h2>
        <h1 style="color: #B701A5"> ₡{{ saldo }} </h1>
    </section>
</template>

<script>
export default {
    name: 'TablaProductos',
    props: {
        saldo: Number
    }
}
</script>