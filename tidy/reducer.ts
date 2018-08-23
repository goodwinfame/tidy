import * as models from '../models';


/**
 * 获取文件名与namespace的映射关系
 */
const fileMap = Object.keys(models).reduce((total, key)=>Object.assign(total, {[models[key].namespace]: key}), {});


/**
 * 初始化状态为各model对象中的state对象集合，以命名空间为key
 */
const INIT_STATE = Object.values(models).reduce((total, item: model)=>Object.assign(total, {[item.namespace]: item.state}), {});

/**
 * 汇总model reducer，将reducer方法名统一加上model的namespace
 */
const reducers = Object.values(models).reduce((total, item: model)=>{
  const namespace = item.namespace;
  const modelReducer = {};

  for(const key in item.reducer) {
    modelReducer[`${namespace}/${key}`] = item.reducer[key];
  }


  return Object.assign(total, modelReducer)

}, {});


export default function(state = INIT_STATE, { type, payload }) {


  if(reducers[type]) {
    const namespace = type.split('/')[0];

    const modelState = state[namespace];

    const nextModelState = reducers[type](modelState, {payload});

    /**
     * 获取model getter
     * 并动态计算getter结果
     * 将计算结果放入state
     */
    const modelGetter = models[fileMap[namespace]].getter || {};

    Object.keys(modelGetter).forEach(getterName=>{
      const getterValue = modelGetter[getterName]({
        ...state,
        [namespace]: nextModelState
      });

      nextModelState[getterName] = getterValue;
    })

    return {
      ...state,
      [namespace]: nextModelState
    }


  } else {
    return state;
  }


}