import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'


export default function Home() {

  const { loading, data } = useQuery(FETCH_POSTS_QUERY)

  if (data) {
    console.log(data)
  }

  console.log("hello home :)")
  return (
    <div>
      hello world HOme
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
