<template>
  <div>
    <h4 class="sidebar-item-title">GET THE E-BOOK</h4>
    <a href="https://leanpub.com/testingvuejscomponentswithjest" target="_blank" @click="$ga.event('Book', 'Click', 'Sidebar')">
      <img src="/VueJest.png" alt="Testing Vuejs Components with Jest" class="sidebar-item-image">
    </a>
  </div>
</template>
