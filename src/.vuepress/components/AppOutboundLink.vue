<template>
  <a class="outbound-link" @click="$ga.event('Outbound Link', 'Click', $event.currentTarget.href)">
    <slot/>
  </a>
</template>