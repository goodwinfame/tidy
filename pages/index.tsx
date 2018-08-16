import React from 'react'
import Link from 'next/link'
import { of, Subject } from 'rxjs'
import { StateObservable } from 'redux-observable'
import { connect } from 'tidy'
import CharacterInfo from '../components/CharacterInfo/index'
import rootEpic from '../store/epics'
import {Button} from 'antd';


interface Props {
  dispatch: Function,
  isFetching
} 
interface State {}

class Counter extends React.Component<Props, State> {
  static async getInitialProps ({ store, isServer }) {
    const state$ = new StateObservable(new Subject(), store.getState())
    const resultAction = await rootEpic(
      of({
        type: `user/FETCH_CHARACTER`,
        payload: { isServer }
      }),
      state$
    ).toPromise() // we need to convert Observable to Promise
    store.dispatch(resultAction)

    return { isServer }
  }

  componentDidMount () {
    this.props.dispatch({
      type: `user/START_FETCHING_CHARACTERS`

    })
  }

  componentWillUnmount () {
    this.props.dispatch({
      type: `user/STOP_FETCHING_CHARACTERS`

    })
  }

  render () {
    return (
      <div>
        <h1>Index Page</h1>
        <CharacterInfo />
        
        <br />
        <Button icon={this.props.isFetching?'pause-circle':'play-circle'} onClick={()=>{

          if(this.props.isFetching){
            this.props.dispatch({
              type: `user/STOP_FETCHING_CHARACTERS`
        
            })
          } else {
            this.props.dispatch({
              type: `user/START_FETCHING_CHARACTERS`
        
            })
          }
          
        }}/>
        <nav>
          <Link href='/other'><a>Navigate to "/other"</a></Link>
        </nav>
      </div>
    )
  }
}

export default connect(({user})=>({
  isFetching: user.isFetching
}))(Counter)
