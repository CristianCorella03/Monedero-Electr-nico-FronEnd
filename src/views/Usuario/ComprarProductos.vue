<template>
    <div style="margin: 40px 50px;">
        <h1>Compras 🛒</h1>
        <hr>
        <br>
        <h3 style="color: green;">Saldo disponible: ₡{{ saldo }}</h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <span>Seleccione los productos a comprar</span> <br>
            <span>Cantidad</span>
        </div>
        <div id="product-list">
            <article class="card" v-for="(item, index) in productosList" :key="index" >
                <div style="width: 75%; height: 40px; display: flex; align-items: center; gap: 10px;" @click="toggleCheckbox(item)">
                    <input type="checkbox" v-model="item.isChecked"> <b>{{ item.descripcion }} - ₡{{item.precioUnidad }} </b> | Disponibles: {{item.cantidadStock }}
                </div>
                <input class="input" :id="'input'+item.codigoProducto" type="number" value="1" min="1" :max="item.cantidadStock">
            </article>

            <button type="submit" class="button" @click="comprar">Comprar</button>
        </div>
    </div>
</template>

<script>
import { BASE_URL } from '../../config.js';
export default {
    name: 'ComprarProductos',
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
            productosList: [],
            total: 0
        }
    },
    async created() {

        this.productosList = this.getProductos().map(producto => ({
            ...producto,
            isChecked: false
        }));

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
    methods: {
        getProductos() {
            return [
                { codigoProducto: 'P1203', descripcion: "Manzanas", precioUnidad: 740.00, cantidadStock: 20 },
                { codigoProducto: 'P1201', descripcion: "Peras", precioUnidad: 530.00, cantidadStock: 50 },
                { codigoProducto: 'P1203', descripcion: "Mangos", precioUnidad: 240.00, cantidadStock: 25 },
            ]
        },
        toggleCheckbox(producto) {
            producto.isChecked = !producto.isChecked;
        },
        comprar() {
            const productosSeleccionados = this.productosList.filter(producto => producto.isChecked);
            console.log(productosSeleccionados)
            let listaProductos = [];
            let totalVenta = 0;

            if (productosSeleccionados.length > 0) {
                productosSeleccionados.map((p) => {

                    let cantidadDeProducto = document.getElementById('input' + p.codigoProducto).value;
                    p.cantidadDeProducto = parseInt(cantidadDeProducto);
                    totalVenta = totalVenta + (cantidadDeProducto * p.precioUnidad)
                    listaProductos.push({
                        codigoProducto: p.codigoProducto,
                        cantidadComprada: p.cantidadDeProducto
                    });
                })

            } else {
                alert("Por favor, selecciona al menos un producto.");
                return
            }
            console.log(listaProductos)
            console.log(totalVenta)
            
        }
    }
}
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 40px;
    margin-bottom: 10px;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card:hover {
    background-color: #f0f0f0;
}

.button {
    background-color: #DBF6CA;
}

.button:hover {
    background-color: #bbff90;
}

.input {
    width: 60px;
    height: 28px;
    margin: 0;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
