<template>
    <div class="form">
        <h2>Registro de Productos | {{ establecimiento.nombre }} - {{ establecimiento.codigoEstablecimiento }}</h2>
        <hr>
        <form @submit.prevent="submitForm">
            <div>
                <label for="descripcion">Descripcion:</label>
                <input type="text" id="descripcion" v-model.trim="descripcion" required>
            </div>
            <div>
                <label for="precioUnidad">Precio Unidad:</label>
                <input type="number" step="0.01" id="precioUnidad" v-model.trim="precioUnidad" placeholder="₡" required>
            </div>
            <div>
                <label for="cantidadStock">Cantidad (Stock):</label>
                <input type="number" id="cantidadStock" v-model.trim="cantidadStock" min="0" required>
            </div>
            <button class="button" type="submit">Registrar Producto</button>
        </form>
    </div>
</template>

<script>
import { BASE_URL } from '../../config.js';
export default {
    data() {
        return {
            establecimiento: this.getEstablecimientoLocal(),
            descripcion: '',
            precioUnidad: '',
            cantidadStock: ''
        };
    },
    methods: {
        getEstablecimientoLocal() {
            const objetoRecuperadoString = localStorage.getItem('establemientoObject');
            return JSON.parse(objetoRecuperadoString);
        },
        submitForm() {
            fetch(BASE_URL + '/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codigoEstablecimiento: this.establecimiento.codigoEstablecimiento,
                    descripcion: this.descripcion,
                    precioUnidad: parseFloat(this.precioUnidad),
                    cantidadStock: this.cantidadStock
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear el cliente');
                }
                return response.json();
            })
            .then(data => {
                // Manejar la respuesta del servidor aquí
                alert('Producto agregado al local!', data);
                window.location.reload();
            })
            .catch(error => {
                alert('Error al crear el producto:', error.message);
            });
        }
    }
};
</script>

<style scoped>
form {
    max-width: 400px;
    margin: 40px 0px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.button {
    background-color: #CAE2F6;
}

.button:hover {
    background-color: #7fbef1;
}
</style>