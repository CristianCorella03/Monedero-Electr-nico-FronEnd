<template>
    <div style="margin: 40px 50px;">
        <h1>Detalles del Monedero Electrónico</h1>
        <hr>
        <br><br>

        <table>
            <tr>
                <td>Nombre</td>
                <td> {{ nombre }} {{ apellidos }}</td>
            </tr>
            <tr>
                <td>Correo</td>
                <td> {{ correo }} </td>
            </tr>
            <tr>
                <td>Teléfono</td>
                <td> {{ telefono }} </td>
            </tr>
        </table>

        <section style="margin-left: 300px;">
            <h2>Monto Actual</h2>
            <h1 style="color: #B701A5"> ₡{{ monederoElectronico.saldo }} </h1>
        </section>

        <section style="display: flex; gap: 20px;">
            <a class="button" href="/usuario/recargar">Realizar Deposito</a>
            <a class="button" href="/usuario/compras">Ver Transacciones</a>
        </section>
    </div>
</template>

<script>
export default {
    name: 'MiCuenta',
    data() {
        return {
            idCliente: "C1000",
            nombre: "Fulanito",
            apellido: "Gustavo",
            telefono: "88888888",
            correo: "fulano@gmail.com",
            monederoElectronico: {
                idMonedero: 1,
                idCliente: "C1000",
                saldo: 20000.78
            }
        }
    },
    methods: {
        getDatos() {
            return []
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    max-width: 800px;
    border-collapse: collapse;
}

td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    background-color: #F1F1F1;
}


.button {
    background-color: #DBF6CA;
}

.button:hover {
    background-color: #abf47e;
}
</style>