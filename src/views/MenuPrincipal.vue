<template>
    <div class="menu">
        <h1>Menu Principal</h1>

        <h2>¿Qué desea realizar?</h2>
        <div class="button-container">
            <button @click="navigate('/central')">Central</button>
            <button @click="navigate('/establecimiento')">Local</button>
            <button @click="navigate('/usuario')">Usuario</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuPrincipal',
    methods: {
        navigate(path) {
            // Redirigir a la ruta especificada
            window.location.href = path;
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

button {
    width: 300px;
    margin: 0 10px;
    padding: 10px 50px;
    background-color: #fafabb;
    color: #222;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s;
}

button:hover {
    background-color: yellow;
    transform: scale(1.1);
}
</style>
