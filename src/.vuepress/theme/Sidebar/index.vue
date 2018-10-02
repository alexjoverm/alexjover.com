<template>
  <div class="sidebar">
    <SubscribeForm class="sidebar-item" formLocation="sidebar"/>
    <SidebarBook class="sidebar-item" />
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

