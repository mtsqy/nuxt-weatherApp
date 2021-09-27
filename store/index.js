export const state = () => ({
    coord: {
        lon: 0,
        lat: 0
    },
    current: {
        name: 'Getting Location..'
    },
    storedLoc: [],
    menuOpen: false
})

export const mutations = {
    
    setState(state, payload) {
        if(typeof payload == 'object' && typeof payload.type == 'string') state[payload.type] = payload.data
    },

    add(state, item) {
        state.storedLoc.push(item)
    },
    
    update(state, payload) {
        state.storedLoc[payload.index] = payload.item
    },

    remove(state, index) {
        state.storedLoc.splice(index, 1);
    },
}