import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "./tipo-acoes";
import http from "@/http/index"


interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },
    },
     
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos').then(res => commit(DEFINIR_PROJETOS, res.data))
        },
        [CADASTRAR_PROJETO](ctx, nomeDoProjeto: string){
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO](ctx, projeto: IProjeto){
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO]({ commit }, id: string){
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}