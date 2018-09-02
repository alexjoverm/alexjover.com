<template>
  <BaseHero centered image="/speaking.jpg">
    <img src="/alex.jpg" alt="Alex Jover" class="profile-image rounded">
    <h1 class="title"><i>Hi, I'm</i> <strong class="semi-bold">Alex Jover</strong>!</h1>
    <h4 class="subtext">Trainer and developer on Web Technologies loving PWA, Web Performance, JavaScript and Vue.</h4>
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
@import "~styles/theme";

$badge-color: $white-color;
$badge-background: $navbar-color;
$home-hero-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);

.hero {
  position: relative;

  &.with-image /deep/ .wrapper {
    padding-bottom: 3rem;
    padding-top: 3rem;
    // padding-top: 11rem;
  }

  .title,
  .subtext {
    font-weight: normal;
    letter-spacing: 1px;
  }

  .title {
    font-size: 3.5rem;
    margin-top: 1.3rem;
  }
  .subtext {
    margin: 1rem 0 2.6rem 0;
    font-size: 1.8rem;
  }
}

.profile-image {
  width: 110px;
  // position: absolute;
  // left: 50%;
  // top: 3rem;
  // transform: translateX(-50%);
  box-shadow: $home-hero-shadow;
}

.social-badges {
  /deep/ a {
    color: $badge-color;
    background-image: $badge-background;
    display: inline-block;
    margin: 0 10px;
    border-radius: 99rem;
    width: 4rem;
    height: 4rem;
    font-size: 2.3rem;
    line-height: 4.5rem;
    box-shadow: $home-hero-shadow;
  }
}
</style>


