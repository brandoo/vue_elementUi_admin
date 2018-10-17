<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="less">
  html, body, div, img, span, p, ul, li {
    margin: 0;
    padding: 0;
  }
  html, body, #app {
    width: 100%;
    height: 100%;
    color: #333;
  }
  ul {
    list-style: none;
  }
  .fade-enter-active {
    animation-name: fadeIn;
    animation-duration: 1s;
  }
</style>
