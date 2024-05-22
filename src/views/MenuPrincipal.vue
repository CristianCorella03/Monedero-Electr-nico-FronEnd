<template>
    <div class="menu">
        <h1>Menu Principal</h1>

        <h2>¿Qué desea realizar?</h2>
        <div class="button-container">
            <button class="button" @click="navigate('/central')">Central</button>

            <!-- Formulario de seleccion de locales -->
            <details class="button">
                <summary>Locales</summary>
                <div style="display: flex; flex-direction:column; align-items: center;">
                    <select v-model="establecimientoSeleccionado">
                        <option :value="establecimientoSeleccionado" selected>Selecciona un establecimiento</option>
                        <option v-for="establecimiento in establecimientos" :key="establecimiento.codigoEstablecimiento" :value="establecimiento">{{ establecimiento.nombre }}</option>
                    </select>
                    <button class="submit" @click="navigate('/establecimiento')">Local</button>
                </div>
                </details>

            <!-- Formulario de inicio de sesión -->
            <details class="button">
                <summary>Usuario</summary>
                <div>
                    <form @submit.prevent="login">
                        <input type="text" v-model="username" placeholder="Correo">
                        <input type="password" v-model="password" placeholder="Contraseña">
                        <button class="submit" type="submit">Iniciar Sesión</button>
                    </form>
                </div>
            </details>

        </div>
    </div>
</template>

<script>
import { BASE_URL } from '../config.js';

export default {
    name: 'MenuPrincipal',
    data() {
        return {
            username: '',
            password: '',
            error: '',
            establecimientoSeleccionado: 'Selecciona un establecimiento',
            establecimientos: []
        };
    },
    created() {
        fetch(`${BASE_URL}/api/nodoEstablecimientos`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.establecimientos = data;
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            });
    },
    methods: {
        navigate(path) {
            
            if (path.includes('/establecimiento') && this.establecimientoSeleccionado === 'Selecciona un establecimiento') {
                alert("Debe seleccionar un establecimiento");
                return
            }

            if (path.includes('/establecimiento')) {
                localStorage.setItem('establemientoObject', JSON.stringify(this.establecimientoSeleccionado));
            }
            
            // Redirigir a la ruta especificada
            window.location.href = path;
        },
        async login() {
            try {
                const response = await fetch(`${BASE_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        correo: this.username,
                        contrasenna: this.password
                    })
                });

                const data = await response.json();

                if (data.length > 0) {
                    localStorage.setItem('username', JSON.stringify(data));
                    window.location.href = '/usuario';
                } else {
                    // Mostrar mensaje de error si el inicio de sesión falla
                    this.error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
                    alert(this.error)
                }
            } catch (error) {
                this.error = 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
                alert('Error al iniciar sesión:', error);
            }
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 40px;
}

.menu {
    text-align: center;
}

.button-container {
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
}
.submit {
    background-color: #4f4f43;
    color: white
}
.submit:hover {
    background-color: #939371;
}
.submit:active {
    background-color: #cbcb6e;
}
.button {
    width: 350px;
    background-color: #fafabb;
    transition: transform 0.2s;
}
details {
    width: 300px !important;
}
.button:hover {
    background-color: yellow;
    transform: scale(1.1);
}
select {
    border: 1px solid;
    width: 100%;
    padding: 8px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        border: 1px solid;
        width: 100%;
        padding: 8px;
        margin-top: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
}
</style>
