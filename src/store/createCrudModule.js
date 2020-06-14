import merge from 'lodash/fp/merge';
import { client } from '@/store';


export function createCrudModule(
    ns,
    options,
) {
    const route = options?.url || ns;
    const module = {
        namespaced: true,
        state: {
            paginator: {
                results: []
            }
        },
        actions: {
            async getEntities({ commit }, page = 1) {
                const { data } = await client.get(`/${route}/popular`, {
                    params: {
                        page
                    }
                })
                commit('SET_ENTITIES', data)
            },
            async getEntity(context, id) {
                const { data } = await client.get(`/${route}/${id}`)
                return data
            },
        },
        mutations: {
            SET_ENTITIES(state, payload) {
                state.paginator = payload
            }
        },
        getters: {},
    };
    return merge(module)(options);
}
