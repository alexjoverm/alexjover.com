<template>
  <form class="subscribe-form" @submit="$ga.event('Subscribe Form', 'Submit', formLocation)" action="https://github.us16.list-manage.com/subscribe/post?u=534e314884644825b957a5eee&amp;id=e05e60374d" method="post" name="mc-embedded-subscribe-form" target="_blank">
    <slot name="header">
      <h4 class="form-title">GET THE LATEST CONTENT</h4>
      <p>Subscribe for upcoming guides, tutorials and courses. No spam.</p>
    </slot>

    <div class="form-container">
      <Input class="name-input" name="FNAME" placeholder="Name" aria-label="Name"/>
      <Input class="email-input" name="EMAIL" type="email" placeholder="Email" required aria-label="Email" autocapitalize="off" autocorrect="off"/>
    </div>
    <Button type="submit" class="submit-button">
      <slot name="submit-button">I WANT <b>FREE</b> CONTENT</slot>
    </Button>
  </form>
</template>


<script>
import Input from "@/ui/Input";

export default {
  props: {
    formLocation: {
      type: String,
      default: 'Somewhere'
    }
  },
  components: { Input },
  // data: () => ({
  //   name: "",
  //   email: ""
  // })
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.form-container {
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 0.8rem;
    flex: 1;
    min-width: 0;
  }
}

.submit-button {
  width: 100%;
}

@media (min-width: $mq-xs) {
  .form-container {
    flex-direction: row;

    input:first-child {
      margin-right: 0.8rem;
    }
  }
}
</style>
