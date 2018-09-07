<template>
  <div class="book-suggestion">
    <AppOutboundLink class="book-image" href="https://leanpub.com/testingvuejscomponentswithjest">
      <img src="/VueJest.png" alt="Testing Vue.js components with Jest">
    </AppOutboundLink>
    <div class="book-suggestion-info">
      <p>You can find the content of this article updated to the most recent version of <i>vue-test-utils</i> and <i>Jest</i> on my book.</p>
      <div class="text-center">
        <Button>
          <AppOutboundLink href="https://leanpub.com/testingvuejscomponentswithjest">
            Get it here!
          </AppOutboundLink>
        </Button>
      </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import "~styles/theme";

.book-suggestion {
  // padding: 1.5rem 2.1rem;
  // border-left-width: 4px;
  // border-left-style: solid;
  display: block;
  margin: $text-margin;
  font-size: 1.1em;
  @include box-color($accent-color, 30%);
  // @include box-color($gray, 30%);

  .book-image {
    margin: 0 auto;
    display: block;
    width: 170px;
    flex: 0 0 170px;
  }

  .book-suggestion-info {
    padding: 2.4rem 2.9rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    a {
      color: white;
    }
  }
}

@media (min-width: $mq-sm) {
  .book-suggestion {
    display: flex;
  }
}
</style>
