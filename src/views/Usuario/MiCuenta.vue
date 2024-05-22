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

        <MontoActual :saldo="saldo"/>

        <section style="display: flex; gap: 20px;">
            <a class="button" href="/usuario/recargar">Realizar Deposito</a>
            <a class="button" href="/usuario/compras">Ver Transacciones</a>
        </section>
    </div>
</template>

<script>
import MontoActual from '../../components/MontoActual.vue';
import { BASE_URL } from '../../config.js';

export default {
    name: 'MiCuenta',
    data() {
        return {
            codigoCliente: "",
            nombre: "",
            apellidos: "",
            cedula: "",
            telefono: "",
            correo: "",
            saldo: 0,
            idMonedero: 0
        }
    },
    async created() {
        var clienteObjeto = JSON.parse(localStorage.getItem('username'))[0];
        this.codigoCliente = clienteObjeto.codigoCliente;
        

        fetch(`${BASE_URL}/api/monederoElectronicos/saldo?codigoCliente=${this.codigoCliente}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const clienteObjeto = data[0];
                this.nombre = clienteObjeto.nombre;
                this.apellidos = clienteObjeto.apellidos;
                this.cedula = clienteObjeto.cedula;
                this.telefono = clienteObjeto.telefono;
                this.correo = clienteObjeto.correo;
                this.saldo = clienteObjeto.saldo;
                this.idMonedero = clienteObjeto.idMonedero;
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            })
    },
    components: {
        MontoActual
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