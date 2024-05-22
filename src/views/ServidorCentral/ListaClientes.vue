<template>
    <div style="margin: 40px 50px;">
        <h1>Clientes registrados</h1>
        <hr>
        <span>Presione un cliente para ver detalles</span>
        <br><br>
        <details v-for="(item, index) in clientesList" :key="index" >
            <summary style="display: flex; justify-content: space-between;" >
                <span>{{ item.cedula }} | {{ item.nombre }} {{ item.apellidos }}</span>
                <div id="icons">
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>eye</title> <path d="M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z"></path> </g></svg>
                    <svg @click="eliminarCliente(item.codigoCliente)" width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#280101" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></g></svg>
                </div>
            </summary>
            <div class="card-content">
                <p>Teléfono: {{ item.cedula }}</p>
                <p>Correo: {{ item.correo }}</p>
            </div>
        </details>
        <br>
        <a class="button" href="/central/registro-cliente">Registrar Nuevo</a>
    </div>

</template>

<script>
import { BASE_URL } from '../../config.js';

export default {
    name: 'ClientesRegistrados',
    data() {
        return {
            clientesList: []
        }
    },
    created() {
        fetch(`${BASE_URL}/api/clientes`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.clientesList = data;
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            });
    },
    methods: {
        eliminarCliente(codigoCliente) {
            fetch(`${BASE_URL}/api/clientes/${codigoCliente}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codigoCliente
                }),
            })
            .then(response => {
                alert('Cliente eliminado!', response);
                window.location.reload();
            })
            .catch(error => {
                alert('Error al eliminar el cliente:' + codigoCliente, error.message);
            });
        }
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
    background-color: #FCD8D8;
}

.button:hover {
    background-color: #f9a3a3;
}
</style>