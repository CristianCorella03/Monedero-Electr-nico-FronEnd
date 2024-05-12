<template>
  <header :style="{ backgroundColor: headerColor }">
    <div class="logo">{{ title }}</div>
    <nav>
      <ul>
        <li v-for="(item, index) in menuOptions" :key="index">
          <router-link :to="item.link">{{ item.text }}</router-link>
        </li>
        <li v-if="menuOptions.length > 0">
          <a href="/">Salir</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderDinamico',
  props: {
    title: String,
    headerColor: String,
    menuOptions: Array
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.logo {
  font-size: 18px;
  font-weight: bold;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 15px;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>