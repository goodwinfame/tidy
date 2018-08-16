declare module 'models/*.ts' {
    const model: model;
    export default model;
}

interface model {
    namespace: string,
    state: Object,
    epic: Object,
    reducer: Object,
    getter: Object
}