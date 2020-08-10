import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Card, Icon, Image } from 'semantic-ui-react'


export default function Home() {

  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  if (data) {
    console.log(data)
  }

  console.log("hello home :)")
  return (
    <div>
      <h1>hello world HOme</h1>
      <Card>
        <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
      </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
        22 Friends
      </a>
        </Card.Content>
      </Card>
    </div>
  )
}

const FETCH_POSTS_QUERY = gql`
  {  
    getPosts {
      id body createdAt username
    }
  }
`
