import { createRouter, createWebHistory  } from 'vue-router';

import MenuPrincipal from './views/MenuPrincipal.vue'

/* Paginas del nodo central */
import RegistroCliente from './views/ServidorCentral/RegistroCliente.vue';
import RegistroEstablecimiento from './views/ServidorCentral/RegistroEstablecimiento.vue';
import Clientes from './views/ServidorCentral/ListaClientes.vue';
import Establecimientos from './views/ServidorCentral/ListaEstablecimientos.vue';

/* Paginas del nodo local */
import RegistroProducto from './views/ServidorLocal/RegistroProductos.vue';
import Productos from './views/ServidorLocal/ListaProductos.vue';
import HistorialVentas from './views/ServidorLocal/HistorialVentas.vue';

/* Paginas del usuario */
import Comprar from './views/Usuario/ComprarProductos.vue';
import RecargarCuenta from './views/Usuario/RecargarCuenta.vue';
import MisCompras from './views/Usuario/MisCompras.vue';
import MiCuenta from './views/Usuario/MiCuenta.vue';

const routes = [
    { path: '/', component: MenuPrincipal },  
    /* path de servidor central */  
    { path: '/central', component: Establecimientos },
    { path: '/central/registro-cliente', component: RegistroCliente },
    { path: '/central/registro-establecimiento', component: RegistroEstablecimiento },
    { path: '/central/clientes', component: Clientes },
    { path: '/central/establecimientos', component: Establecimientos },
    /* poth de servidor local */
    { path: '/establecimiento', component: Productos },
    { path: '/establecimiento/registro-producto', component: RegistroProducto },
    { path: '/establecimiento/productos', component: Productos },
    { path: '/establecimiento/historial-ventas', component: HistorialVentas },
    /* Paginas del usuario */
    { path: '/usuario', component: MiCuenta },
    { path: '/usuario/comprar', component: Comprar },
    { path: '/usuario/recargar', component: RecargarCuenta },
    { path: '/usuario/compras', component: MisCompras },
    { path: '/usuario/cuenta', component: MiCuenta }
  ]

// Crea el router
export default createRouter({
    history: createWebHistory (),
    routes
});