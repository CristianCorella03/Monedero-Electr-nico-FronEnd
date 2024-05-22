<template>
    <div style="margin: 40px 50px;">
        <h1>Recargue saldo a su Monedero Electrónico 💸</h1>
        <hr>
        <br><br>
        <h3>{{ nombre }} {{ apellidos }} - {{ correo }}</h3>
        <br>
        <div>
            <span>Indique la cantidad a depositar</span>
            <form @submit.prevent="submitForm">
                <div>
                    <input type="number" step="0.01" id="total" v-model.trim="total" placeholder="₡" required >
                </div>
                <MontoActual :saldo="parseFloat(saldo.toFixed(2))"/>
                <button class="button" type="submit">Continuar</button>
            </form>
        </div>
    </div>
</template>

<script>
import MontoActual from '../../components/MontoActual.vue';
import { BASE_URL } from '../../config.js';
export default {
    name: 'RecargarCuenta',
    data() {
        return {
            codigoCliente: "",
            nombre: "",
            apellidos: "",
            cedula: "",
            telefono: "",
            correo: "",
            saldo: 0,
            idMonedero: 0,
            total: null
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
        submitForm() {
            
            fetch(`${BASE_URL}/api/monederoElectronicos/recargar/?idMonedero=${this.idMonedero}&monto=${this.total}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(data.msj);
                if (data.status) window.location.reload();
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            })
        }
    }
}
</script>

<style scoped>

form {
    width: 750px;
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
    background-color: #DBF6CA;
    margin-left: 220px;
    width: 320px;
}

.button:hover {
    background-color: #bdfb96;
}
</style>