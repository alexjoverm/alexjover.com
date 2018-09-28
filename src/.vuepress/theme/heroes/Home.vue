<template>
  <BaseHero centered image="/home.jpg">
    <div class="home-hero-content">
      <h1 class="title"><i>Hi, I'm</i> <strong class="semi-bold">Alex Jover</strong>!</h1>
      <h4 class="subtext">A Web Developer with a passion for creating courses and training teams</h4>
      <SocialBadges/>
    </div>
  </BaseHero>
</template>

<script>
import BaseHero from "./Base";
import SocialBadges from "@/ui/SocialBadges";

export default {
  components: { BaseHero, SocialBadges }
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

$badge-color: $white-color;
$badge-background: $navbar-color;

.hero.with-image {
  position: relative;
  background-size: 230%;
  background-position: top center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.45);

  /deep/ .wrapper {
    display: flex;
    justify-content: center;
  }

  .title,
  .subtext {
    font-weight: normal;
    letter-spacing: 1px;
  }

  .title {
    font-size: 4.1rem;
    margin-top: 1.3rem;
  }
  .subtext {
    margin: 1rem 0 2.6rem 0;
    font-size: 2.1rem;
    line-height: 3.4rem;
  }
}

.home-hero-content {
  flex: 0 0 100%;
  // padding: 3rem;
  // background: rgba(0, 0, 0, 0.2);
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
    box-shadow: $images-shadow;
  }
}

@media (min-width: 650px) {
  .hero.with-image {
    background-size: 110%;
  }
}

@media (min-width: 550px) {
  .hero.with-image {
    background-size: 180%;
  }
}

@media (min-width: 450px) {
  .hero.with-image {
    .title {
      font-size: 4.8rem;
    }
    .subtext {
      font-size: 2.3rem;
    }
  }
}

@media (min-width: $mq-md) {
  .hero.with-image {
    background-size: 100%;
    background-position: left center;
  }

  .home-hero-content {
    flex-basis: 55%;
  }
  .hero.with-image /deep/ .wrapper {
    justify-content: flex-end;
  }
}
@media (min-width: $mq-xl) {
  .hero.with-image {
    /deep/ .wrapper {
      padding-bottom: 14rem;
      padding-top: 14rem;
    }
  }
}
</style>


