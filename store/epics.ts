import { combineEpics, ofType} from 'redux-observable'
import { interval, of, concat } from 'rxjs'
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



export default combineEpics(
  ...epics
)
