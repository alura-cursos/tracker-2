<template>
  <div class="box">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para iniciar uma nova tarefa">
        <input
          class="input"
          type="text"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoFinalizarTarefa="salvarTarefa"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from 'vuex'

import { key } from '@/store'

export default defineComponent({
  name: "Formulario",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },

  setup (props, { emit }) {

    const store = useStore(key);
    const descricao = ref("")
    const idProjeto = ref("")
    const projetos = computed(() => store.state.projeto.projetos)

    const salvarTarefa = (tempoEmSegundos: number) => {    
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoEmSegundos,
        descricao: descricao.value,
        projeto: projetos.value.find(proj => proj.id == idProjeto.value)
      })
      descricao.value = ''
    }


    return {
      descricao,
      idProjeto,
      salvarTarefa,
      projetos
    }
  }
});
</script>
<style scoped>
.button {
  margin-left: 8px;
}
.box {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>