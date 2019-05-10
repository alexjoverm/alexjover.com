<template>
  <AppOutboundLink
    class="sponsor-item sidebar-item"
    href="https://vueschool.io/courses?friend=vuedose"
    alt="VueSchool"
    target="_blank"
  >
    <img src="/vueschool-testing-vuejs-components.png" alt="VueSchool">
    <div class="sponsor-item-content">
      <p class="sidebar-item-title">
        <b>Vue School</b>
      </p>
      <p class="sidebar-item-description">
        Get access to the
        <b>free courses</b> and more than 240 lessons on Vue, Nuxt and JavaScript
      </p>
    </div>
  </AppOutboundLink>
</template>

<style lang="scss" scoped>
.sponsor-item {
  width: 100%;
  display: block;
  background: #fbfafd;
  border-radius: 3px;
  overflow: hidden;
  font-size: 12px;
  color: black;
  text-decoration: none;

  .sponsor-item-content {
    text-align: center;
    padding: 0 4px 4px 4px;
  }

  p {
    margin-top: 6px;
    margin-bottom: 3px;
  }
}
</style>
