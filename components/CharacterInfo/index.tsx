import React from 'react'
import { connect } from 'tidy'
import styles from './index.less';

const CharacterInfo = ({character, brief, error, isFetchedOnServer = false}) => (
  <div className={styles.article}>
    {
      error ? <p>We encountered and error.</p>
        : <article>
          <h3>Character: {character.name}</h3>
          <p>birth year: {character.birth_year}</p>
          <p>gender: {character.gender}</p>
          <p>skin color: {character.skin_color}</p>
          <p>eye color: {character.eye_color}</p>
          <p>{brief}</p>
        </article>

    }
    <p>
      ( was character fetched on server? -
      <b>{isFetchedOnServer.toString()})</b>
    </p>
    
  </div>
)

export default connect(
  ({user}) => ({
    brief: user.brief,
    character: user.character,
    error: user.error,
    isFetchedOnServer: user.isFetchedOnServer
  })
)(CharacterInfo)
