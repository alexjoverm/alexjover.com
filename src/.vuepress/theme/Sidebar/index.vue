<template>
  <div class="sidebar">
    <div id="carbonads"></div>
    <SubscribeForm class="sidebar-item" formLocation="sidebar"/>
    <SidebarBook class="sidebar-item"/>
  </div>
</template>

<script>
import SubscribeForm from "./SubscribeForm";
import SidebarBook from "./SidebarBook";

export default {
  components: { SubscribeForm, SidebarBook }
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

$sidebar-width-sm: 180px;
$sidebar-margin-sm: 35px;

$sidebar-width-md: 230px;
$sidebar-margin-md: 60px;

.sidebar {
  display: none;
  flex: 0 0 $sidebar-width-sm;
  margin-left: $sidebar-margin-sm;
  // background: yellow;

  .sidebar-item {
    margin-bottom: 3.5rem;
  }

  /deep/ {
    .sidebar-item-title {
      margin: 0;
      font-weight: bold;
      font-size: 1.7rem;
    }

    .sidebar-item-description {
      @include small-text;
      margin: 1.2rem 0;
    }

    .sidebar-item-image {
      display: block;
      margin: 1.2rem auto;
      max-width: 85%;
    }
  }
}

@media (min-width: $mq-sm) {
  .sidebar {
    display: block;
  }
}

@media (min-width: $mq-sm) and (max-width: $mq-sm-max) {
  /deep/ .subscribe-form .submit-button {
    font-size: 1.5rem;
  }

  /deep/ .subscribe-form .form-title {
    font-size: 1.6rem;
  }
}

@media (min-width: $mq-md) {
  .sidebar {
    flex: 0 0 $sidebar-width-md;
    margin-left: $sidebar-margin-md;
  }
}
</style>

<style>
#carbonads {
  --width: 180px;
  --font-size: 14px;
}

#carbonads {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  display: block;
  overflow: hidden;
  margin-bottom: 20px;
  max-width: var(--width);
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1);
  background-color: hsl(0, 0%, 98%);
  font-size: var(--font-size);
  line-height: 1.5;
}

#carbonads a {
  color: inherit;
  text-decoration: none;
}

#carbonads a:hover {
  color: inherit;
}

#carbonads span {
  position: relative;
  display: block;
  overflow: hidden;
}

.carbon-img {
  display: block;
  margin-bottom: 8px;
  max-width: var(--width);
  line-height: 1;
}

.carbon-img img {
  display: block;
  margin: 0 auto;
  max-width: var(--width) !important;
  width: var(--width);
  height: auto;
}

.carbon-text {
  display: block;
  padding: 0 1em 8px;
}

.carbon-poweredby {
  display: block;
  padding: 10px var(--font-size);
  background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 5px,
      hsla(0, 0%, 0%, 0.025) 5px,
      hsla(0, 0%, 0%, 0.025) 10px
    )
    hsla(203, 11%, 95%, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 9px;
  line-height: 0;
}

@media only screen and (min-width: 320px) and (max-width: 759px) {
  #carbonads {
    float: none;
    margin: 0 auto;
    max-width: 330px;
  }
  #carbonads span {
    position: relative;
  }
  #carbonads > span {
    max-width: none;
  }
  .carbon-img {
    float: left;
    margin: 0;
  }

  .carbon-img img {
    max-width: 130px !important;
  }
  .carbon-text {
    float: left;
    margin-bottom: 0;
    padding: 8px 20px;
    text-align: left;
    max-width: calc(100% - 130px - 3em);
  }
  .carbon-poweredby {
    left: 130px;
    bottom: 0;
    display: block;
    width: 100%;
  }
}
</style>

