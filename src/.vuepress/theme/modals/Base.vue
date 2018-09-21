<template>
  <transition name="modal-fade">
    <div class="modal-container">
      <div class="modal-backdrop" @click="$emit('close')"></div>

      <div class="modal" role="dialog" :aria-labelledby="titledBy" :aria-describedby="describedBy">
        <button class="btn-close" @click="$emit('close')" aria-label="Close modal">x</button>
        <div class="modal-content">
          <header class="modal-header" :id="titledBy">
            <slot name="header"></slot>
          </header>
          <section class="modal-body" :id="describedBy">
            <slot>
              I'm the default body!
            </slot>
          </section>
          <!-- <footer class="modal-footer">
            <slot name="footer">
              I'm the default footer!

              <button type="button" class="btn-green" @click="close" aria-label="Close modal">
                Close me!
              </button>
            </slot>
          </footer> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    titledBy: {
      type: String,
      default: "modalTitle"
    },
    describedBy: {
      type: String,
      default: "modalDescription"
    }
  }
};
</script>

<style lang="scss">
$modal-z-index-base: 500;
$modal-z-index-content: 505;
$modal-z-index-close: 510;

.modal-container,
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal-container {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: $modal-z-index-base;
}

.modal {
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  z-index: $modal-z-index-content;
  position: relative;
}

.modal-content {
  overflow: auto;
}

.modal-header,
.modal-footer {
  /* padding: 15px; */
  display: flex;
}

.modal-header {
  justify-content: space-between;
}

/* .modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
} */

.modal-body {
  position: relative;
  padding: 2rem;
}

.btn-close {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: $modal-z-index-close;
}
</style>