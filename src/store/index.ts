import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { ADICIONA_TAREFA, ALTERAR_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERA_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from "@/http/index"
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";


export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projeto: { projetos: [] },
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        }
    },
     
    actions: {
       
        [OBTER_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(res => commit(DEFINIR_TAREFAS, res.data))
        },
        [ADICIONA_TAREFA]({ commit }, tarefa: ITarefa){
            return http.post('/tarefas', tarefa)
                    .then(res => commit(ADICIONA_TAREFA, res.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                       .then(() => commit(ALTERA_TAREFA, tarefa))

        },
    },

    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}