<template>
  <div class="sidebar">
    <SubscribeForm @submit.prevent="$ga.event('Subscribe', 'Submit', 'Sidebar')"/>
  </div>
</template>

<script>
import SubscribeForm from "./SubscribeForm";

export default {
  components: { SubscribeForm }
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

