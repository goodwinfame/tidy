import { combineEpics, ofType, StateObservable} from 'redux-observable'
import { interval, of, concat, Subject, Observable } from 'rxjs'
import { takeUntil, mergeMap, switchMap, catchError, map } from 'rxjs/operators'
import * as models from '../models';


const epics = Object.values(models).reduce((total: Array<Function>, item: model): any => {
  const namespace = item.namespace;
  const modelEpics = item.epic;

  return total.concat(
    Object.keys(modelEpics)
      .map(type => 
        (action$, state$) => 
          action$.pipe(
            ofType(`${namespace}/${type}`),
            modelEpics[type](
              {
                state$,
                action$,
              },
              {
                mergeMap,
                switchMap,
                map,
                takeUntil,
                interval,
                catchError,
                concat,
                of
              }
            )
          )
      )
  )
}, []);

const rootEpic = combineEpics(
  ...epics
)

/**
 * 处理epic
 * 返回reducer action
 * @param action$ 
 * @param store 
 */
export async function emit(action$: Observable<any>, store){
  const state$ = new StateObservable(new Subject(), store.getState());

  return await rootEpic(action$, state$).toPromise();
}


export default rootEpic
