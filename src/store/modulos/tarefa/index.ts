import http from "@/http"
import ITarefa from "@/interfaces/ITarefa"
import { Estado } from "@/store"
import { OBTER_TAREFAS, ALTERA_TAREFA, ADICIONA_TAREFA } from "@/store/tipo-acoes"
import { DEFINIR_TAREFAS, ADICIONAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-mutacoes"
import { Module } from "vuex"

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERAR_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        }
    },

    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas';

            if(filtro) {
                url += '?descricao=' + filtro
            }
            http.get(url)
                .then(res => commit(DEFINIR_TAREFAS, res.data))
        },
        [ADICIONA_TAREFA]({ commit }, tarefa: ITarefa){
            return http.post('/tarefas', tarefa)
                    .then(res => commit(ADICIONAR_TAREFA, res.data))
        },
        [ALTERA_TAREFA]({ commit }, tarefa: ITarefa){            
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                       .then(() => commit(ALTERAR_TAREFA, tarefa))

        },
    },
}