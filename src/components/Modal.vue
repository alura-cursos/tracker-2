<template>
  <div class="modal" :class="{ 'is-active': mostrar }" v-if="mostrar">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="cabecalho"/>
      </header>
      <section class="modal-card-body">
        <slot name="corpo"/>
      </section>
      <footer class="modal-card-foot">
        <slot name="rodape"/>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalComponent",
  props: {
    mostrar: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
