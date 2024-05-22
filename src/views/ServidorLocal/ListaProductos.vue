<template>
    <div style="margin: 40px 50px;">
        <h1>Lista de Productos | {{ establecimiento.nombre }} - {{ establecimiento.codigoEstablecimiento }}</h1>
        <span>Dirección: {{establecimiento.direccion}}</span><br>
        <span>Tel: {{establecimiento.telefono}}</span><br>
        <hr>
        <b>Presione un producto para ver detalles</b>
        <br><br>
        <details v-for="(item, index) in productosList" :key="index" >
            <summary style="display: flex; justify-content: space-between;" >
                <span>{{ item.codigoproducto }} | {{ item.descripcion }} - Disponibles {{ item.cantidadstock }}</span>
                <div id="icons">
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>eye</title> <path d="M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z"></path> </g></svg>
                    <svg @click="eliminarProducto(item.codigoproducto)" width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#280101" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></g></svg>
                </div>
            </summary>
            <div class="card-content">
            <p>Precio Unidad: ₡{{ item.preciounidad }}</p>
            <span>Modificar Candidad (Stock): 
                <input type="number" v-model="nuevasExistencias" min="0" :max="9999" step="1">
                <button class="button" @click="actualizarExistencias(item.codigoproducto)">Guardar</button>
            </span>
        </div>

        </details>

        <br>
        <a class="button" href="/establecimiento/registro-producto">Registrar Producto</a>
    </div>

</template>

<script>
import { BASE_URL } from '../../config.js';
export default {
    name: 'ProductosRegistrados',
    data() {
        return {
            nuevasExistencias: 0,
            establecimiento: this.getEstablecimientoLocal(),
            productosList: []
        }
    },
    created() {
        fetch(`${BASE_URL}/productos?codigoEstablecimiento=${this.establecimiento.codigoEstablecimiento}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.productosList = data;
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            });
    },
    methods: {
        getEstablecimientoLocal() {
            const objetoRecuperadoString = localStorage.getItem('establemientoObject');
            return JSON.parse(objetoRecuperadoString);
        },
        eliminarProducto(codigoProducto) {
            fetch(`${BASE_URL}/productos/${codigoProducto}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Producto eliminado exitosamente!', data);
                window.location.reload();
            })
            .catch(error => {
                alert(`Error al eliminar el producto: ${codigoProducto}, ${error.message}`);
            });
        },
        actualizarExistencias(codigoProducto) {
            fetch(`${BASE_URL}/productos/${codigoProducto}/existencias`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ existencias: this.nuevasExistencias }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                window.location.reload();
            })
            .catch(error => {
                alert(`Error al actualizar existencias del producto: ${codigoProducto}, ${error.message}`);
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
    background-color: #CAE2F6;
}

.button:hover {
    background-color: #7fbef1;
}
</style>