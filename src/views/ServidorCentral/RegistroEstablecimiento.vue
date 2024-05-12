<template>
    <div class="form">
        <h2>Registro de Establecimientos</h2>
        <hr>
        <form @submit.prevent="submitForm">
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model.trim="nombre" required>
            </div>
            <div>
                <label for="telefono">Teléfono (Costa Rica):</label>
                <input type="tel" id="telefono" v-model.trim="telefono" pattern="^[0-9]{4}[0-9]{4}"
                    placeholder="########" required>
            </div>

            <div>
                <label for="direccion">Dirección:</label>
                <input type="text" id="direccion" v-model.trim="direccion" required>
            </div>

            <button class="button" type="submit">Registrar</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nombre: '',
            telefono: '',
            direccion: ''
        };
    },
    methods: {
        submitForm() {
            console.log('Datos del formulario:', {
                nombre: this.nombre,
                telefono: this.telefono,
                direccion: this.direccion,
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
    background-color: #FCD8D8;
}

.button:hover {
    background-color: #f0abab;
}
</style>