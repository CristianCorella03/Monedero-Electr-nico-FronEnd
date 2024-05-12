<template>
    <div style="margin: 40px 50px;">
        <h1>Recargue saldo a su Monedero Electrónico</h1>
        <hr>
        <br><br>

        <div>
            <span>Indique la cantidad a depositar</span>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="total">Precio Unidad:</label>
                    <input type="number" id="total" v-model.trim="total" placeholder="₡" required>
                </div>
                <button class="button" type="submit">Continuar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecargarCuenta',
    data() {
        return {
            nombre: "Fulanito",
            apellidos: "Gustavo",
            saldo: 23000,
            total: ''
        }
    },methods: {
        submitForm() {
            console.log('Datos del formulario:', {
                total: this.total
            });
        }
    }
}
</script>

<style scoped>

</style>