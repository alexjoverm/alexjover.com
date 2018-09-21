<template>
  <section class="about-author text-center">
    <div class="author">
      <img class="profile-image rounded" src="/alex.jpg" alt="Alex Jover">
      <h4>ALEX JOVER</h4>
      <p>Google Dev Expert, Vue team member, cats and dance lover. Find here all my teachings about web development, web performance and more.</p>
    </div>
    <div class="subscribe-form-container">
      <form class="subscribe-form" @submit="$emit('submit', $event)">
        <h4 class="form-title">GET THE LATEST CONTENT</h4>
        <p>Subscribe for upcoming guides, tutorials and courses. No spam.</p>
        <div class="form-container">
          <Input class="name-input" v-model="name" placeholder="Name"/>
          <Input class="email-input" v-model="email" type="email" placeholder="Email" required/>
        </div>
        <Button type="submit" class="submit-button">I WANT <b>FREE</b> CONTENT</Button>
      </form>
    </div>
  </section>
</template>

<script>
import Input from "@/ui/Input";

export default {
  components: { Input },
  data: () => ({
    name: "",
    email: ""
  })
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.about-author {
  background: $gray-lightest-plus;
  margin: 2.5rem 0;
  padding: 1.8rem 2.3rem;
  border-radius: $base-border-radius;
}

.profile-image {
  width: 110px;
  box-shadow: $images-shadow;
}

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

