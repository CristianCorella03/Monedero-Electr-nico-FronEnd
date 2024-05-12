<template>
    <div class="form">
        <h2>Registro de Productos</h2>
        <hr>
        <form @submit.prevent="submitForm">
            <div>
                <label for="descripcion">Descripcion:</label>
                <input type="text" id="descripcion" v-model.trim="descripcion" required>
            </div>
            <div>
                <label for="precioUnidad">Precio Unidad:</label>
                <input type="text" id="precioUnidad" v-model.trim="precioUnidad" placeholder="₡" required>
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
export default {
    data() {
        return {
            descripcion: '',
            precioUnidad: '',
            cantidadStock: ''
        };
    },
    methods: {
        submitForm() {
            console.log('Datos del formulario:', {
                descripcion: this.descripcion,
                precioUnidad: this.precioUnidad,
                cantidadStock: this.cantidadStock
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