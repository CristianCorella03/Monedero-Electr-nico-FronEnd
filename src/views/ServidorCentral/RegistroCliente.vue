<template>
    <div class="form">
        <h2>Registro de Clientes</h2>
        <hr>
        <form @submit.prevent="submitForm">
            <div>
                <label for="cedula">Cédula (Sin guiones):</label>
                <input type="text" id="cedula" v-model.trim="cedula" pattern="[0-9]{9}" required>
            </div>
            <div>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model.trim="nombre" required>
            </div>
            <div>
                <label for="apellidos">Apellidos:</label>
                <input type="text" id="apellidos" v-model.trim="apellidos" required>
            </div>
            <div>
                <label for="correo">Correo:</label>
                <input type="email" id="correo" v-model.trim="correo" required>
            </div>
            <div>
                <label for="telefono">Teléfono (Costa Rica):</label>
                <input type="tel" id="telefono" v-model.trim="telefono" pattern="^[0-9]{4}[0-9]{4}"
                    placeholder="########" required>
            </div>
            <button class="button" type="submit">Registrar Cliente</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cedula: '',
            nombre: '',
            apellidos: '',
            correo: '',
            telefono: ''
        };
    },
    methods: {
        submitForm() {
            console.log('Datos del formulario:', {
                cedula: this.cedula,
                nombre: this.nombre,
                apellidos: this.apellidos,
                correo: this.correo,
                telefono: this.telefono
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