<template>
  <BaseHero centered image="/speaking.jpg">
    <h1 class="title">Hi, I'm <strong>Alex Jover</strong>!</h1>
    <h4 class="subtext">A trainer and developer on Web Technologies loving PWA, Web Performance, JavaScript and Vue.</h4>
    <SocialBadges/>
  </BaseHero>
</template>

<script>
import BaseHero from "./Base";
import SocialBadges from "@/SocialBadges";

export default {
  components: { BaseHero, SocialBadges }
};
</script>

<style lang="scss" scoped>
.hero {
  .title,
  .subtext {
    font-weight: normal;
  }
}
</style>


