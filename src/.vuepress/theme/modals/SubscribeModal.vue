<template>
  <transition name="modal-fade">
    <BaseModal @close="$emit('close')">
      <img class="profile-image rounded" src="/alex.jpg" alt="Alex Jover">
      <p>Hey! Do you like this post? I have more to share with you. Please subscribe and you'll receive all content I publish out there. No spam.</p>
      <SubscribeFormBase>
        <div slot="header"></div>
      </SubscribeFormBase>
    </BaseModal>
  </transition>
</template>

<script>
import BaseModal from "./Base";
import Input from "@/ui/Input";
import SubscribeFormBase from "@/ui/SubscribeFormBase";

export default {
  components: { BaseModal, Input, SubscribeFormBase }
};
</script>

<style lang="scss" scoped>
@import "~styles/theme";

.profile-image {
  width: 100px;
  box-shadow: $images-shadow;
  margin-bottom: 1.2rem;
}

/deep/ .modal {
  max-width: 100%;
  width: 550px;
  height: 60vh;
  border-radius: $base-border-radius;
  justify-content: center;
}

.submit-button {
  width: 100%;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
</style>

