<template>
    <table>
        <thead>
            <tr>
                <th>Descripción Producto</th>
                <th>Precio Unidad</th>
                <th>Cantidad</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in productosVendidos" :key="index">
                <td> {{ item.descripcion }} </td>
                <td> ₡{{ item.precio }} </td>
                <td> {{ item.cantidadComprada }} </td>
                <td> ₡{{ item.precio * item.cantidadComprada }} </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="total-label">Total:</td>
                <td class="total-amount"> ₡{{ totalVenta }} </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'TablaProductos',
    props: {
        productosVendidos: Array,
        totalVenta: Number
    }
}
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

tfoot td {
    font-weight: bold;
}

.total-label {
    text-align: right;
}

.total-amount {
    color: #e60707;
}
</style>
