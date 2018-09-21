<template>
  <section class="about-author text-center">
    <div class="author">
      <img class="profile-image rounded" src="/alex.jpg" alt="Alex Jover">
      <h4>ALEX JOVER</h4>
      <p>Google Dev Expert, Vue team member, cats and dance lover. Find here all my teachings about web development, web performance and more.</p>
    </div>
    <div class="subscribe-form-container">
      <SubscribeFormBase/>
    </div>
  </section>
</template>

<script>
import Input from "@/ui/Input";
import SubscribeFormBase from "@/ui/SubscribeFormBase";

export default {
  components: { Input, SubscribeFormBase },
  data: () => ({
    name: "",
    email: ""
  })
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.about-author {
  background: $gray-lightest;
  margin: 2.5rem 0;
  padding: 1.8rem 2.3rem;
  border-radius: $base-border-radius;
}

.profile-image {
  width: 110px;
  box-shadow: $images-shadow;
}
</style>

