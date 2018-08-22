import React from 'react'
import Link from 'next/link'
import { connect, dispatch } from 'tidy'
import CharacterInfo from 'components/CharacterInfo/index'
import {Button} from 'antd';


interface Props {
  dispatch: Function,
  isFetching
} 
interface State {}

class Counter extends React.Component<Props, State> {
  static async getInitialProps ({ store, isServer }) {
    
    await dispatch.call({store}, {
      type: `user/FETCH_CHARACTER`,
      payload: { isServer }
    })

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
