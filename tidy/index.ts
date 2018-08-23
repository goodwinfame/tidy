import { connect as rconnect } from 'react-redux'
import { createStore, applyMiddleware, Action } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'
import withRedux from 'next-redux-wrapper'
import reducer from './reducer';
import rootEpic from './epics';
import {emit} from './epics';
import { of } from 'rxjs'

//常量
const TYPES = {
    RESET_STATE: 'RESET_STATE'
}

let store;


/**
 * store初始化
 * @param initialState 
 */
function makeStore (initialState) {
    const epicMiddleware = createEpicMiddleware()
    const logger = createLogger({ collapsed: true }) // log every action to see what's happening behind the scenes.
    const reduxMiddleware = applyMiddleware(epicMiddleware, logger)
  
    store = createStore(reducer, initialState, composeWithDevTools(reduxMiddleware))
  
    epicMiddleware.run(rootEpic)
  
    return store
};

/**
 * store连接方法，默认加入dispatch方法
 * @param mapState 
 */
export function connect(mapState?: Function){
    return (component)=>{
        return rconnect(mapState, {
            dispatch(action: Action){
                return action
            }
        })(component)
    }
}



/**
 * app初始化函数
 * 目前用于封装接入store
 * @param config 
 */
export default function(config?: Object) {
    return (component: any) => {
        return withRedux(makeStore)(component)
    }
        
}


/**
 * 用于服务端发起action
 * @param action 
 */
export async function dispatch(action: Action){

    store = store || this.store;

    const resultAction = await emit(
        of(action),
        store
    );
    
    store.dispatch(resultAction);

}


