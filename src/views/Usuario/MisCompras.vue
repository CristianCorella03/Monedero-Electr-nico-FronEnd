<template>
    <div style="margin: 40px 50px;">
        <h1>Historial de Compras 🛒</h1>
        <hr>
        <span>Compras realizadas por el cliente:  {{ codigoCliente }}</span>
        <p><b>Cédula:</b> {{ cedula }}</p>
        <p><b>Cliente:</b> {{ nombre }} {{ apellidos }}</p>
        
        <details v-for="(item, index) in compraList" :key="index" :open="compraList[0].idfactura !== '-'">
            <summary style="display: flex; justify-content: space-between;" >
                <span>#{{ item.idFactura }} / Fecha {{ item.fecha }}  </span>
                <div id="icons">
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>eye</title> <path d="M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z"></path> </g></svg>
                </div>
            </summary>
            <div class="card-content">
                <p>Detalles:</p>
                <TablaProductos :productosVendidos="item.productosVendidos" :totalVenta="item.totalVenta" />
                <br>
            </div>
        </details>
    </div>
</template>

<script>
import TablaProductos from '../../components/TablaProductos.vue';
import { BASE_URL } from '../../config.js';
export default {
    name: 'MisCompras',
    data() {
        return {
            codigoCliente: "",
            nombre: "",
            apellidos: "",
            cedula: "",
            compraList: []
        }
    },
    created() {
        var clienteObjeto = JSON.parse(localStorage.getItem('username'))[0];
        this.codigoCliente = clienteObjeto.codigoCliente;
        this.nombre = clienteObjeto.nombre;
        this.cedula = clienteObjeto.cedula;
        this.apellidos = clienteObjeto.apellidos;

        fetch(`${BASE_URL}/facturas/clientes?codigoCliente=${this.codigoCliente}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.compraList = data;
            })
            .catch(error => {
                alert('Error extrayendo compras de usuario:', error.message);
            })
    },
    components: {
        TablaProductos
    },
    methods: {

    }
}
</script>

<style scoped>
#icons {
    display: flex;
    gap: 15px;
}

.card-desplegable {
    margin-left: 60px;
}

details {
    width: 800px;
    margin-bottom: 20px;
}

summary {
    cursor: pointer;
    background-color: #f0f0f0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

summary:hover {
    background-color: #e0e0e0;
}

.card-content {
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 5px 5px;
    padding: 10px;
    background-color: #fff;
}

.button {
    background-color: #CAE2F6;
}

.button:hover {
    background-color: #7fbef1;
}
</style>