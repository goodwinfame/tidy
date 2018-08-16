import * as models from '../models';



const INIT_STATE = Object.values(models).reduce((total, item: model)=>Object.assign(total, {[item.namespace]: item.state}), {});

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

    return {
      ...state,
      [namespace]: nextModelState
    }


  } else {
    return state;
  }


}