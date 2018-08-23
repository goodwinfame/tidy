import { request } from 'universal-rxjs-ajax' // because standard AjaxObservable only works in browser


export default {
    namespace: 'user',
    state: {
        nextCharacterId: 1,
        character: {},
        isFetchedOnServer: false,
        error: null,
        isServer: true,
        isFetching: false
    },
    epic: {
        START_FETCHING_CHARACTERS({
            state$,
            action$
        }, {
            switchMap, map, takeUntil, interval, concat, of
        }) {
            return switchMap(action => 
                concat(
                    of({
                        type: `user/CHANGE_FETCHING_STATUS`,
                        payload: { 
                            isFetching: true
                        }
                    }),
                    interval(3000).pipe(
                        map(x =>
                            ({
                                type: `user/FETCH_CHARACTER`,
                                payload: { 
                                    isServer: state$.value.user.isServer
                                }
                            })
                        ),
                        takeUntil(action$.ofType('user/STOP_FETCHING_CHARACTERS'))
                    )    
                )
            )
        },
        STOP_FETCHING_CHARACTERS({}, {
            switchMap, of,concat
        }) {
            return switchMap(action => 
                of({
                    type: `user/CHANGE_FETCHING_STATUS`,
                    payload: { 
                        isFetching: false
                    }
                })
            )
        },
        FETCH_CHARACTER({
            state$,
            action$
        }, {
            mergeMap, map, catchError, of
        }) {
            return mergeMap(action =>
                request({
                    url: `https://swapi.co/api/people/${state$.value.user.nextCharacterId}`
                }).pipe(
                    map(response =>
                        ({
                            type: 'user/FETCH_CHARACTER_SUCCESS',
                            payload: { 
                                response: response.response, 
                                isServer: state$.value.user.isServer
                            }
                        })
                  
                    ),
                    catchError(error =>
                        of(
                            {
                                type: 'user/FETCH_CHARACTER_FAILURE',
                                payload: { 
                                    error: error.xhr.response,
                                    isServer: state$.value.user.isServer
                                }
                            }
                        )
                    )
                )
            )
        },
            
    },
    reducer: {
        FETCH_CHARACTER_SUCCESS(state, { payload }){
            return {
                ...state,
                character: payload.response,
                isFetchedOnServer: payload.isServer,
                nextCharacterId: state.nextCharacterId + 1
            }
        },
        FETCH_CHARACTER_FAILURE(state, { payload }){
            return { ...state, error: payload.error, isFetchedOnServer: payload.isServer }
        },
        CHANGE_FETCHING_STATUS(state, { payload: {isFetching} }){
            return { ...state, isFetching }
        }
        
    },
    getter: {
        brief(globalState){
            return `${globalState.user.character.name}'s eye is ${globalState.user.character.eye_color}`
        }
    }
}