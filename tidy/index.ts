import { connect as rconnect } from 'react-redux'

export function connect(state?: Function){
    return (component)=>{
        return rconnect(state, {
            dispatch(action: Object){
                return action
            }
        })(component)
    }
}
