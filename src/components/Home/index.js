import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'

import { UserList } from '../'

export default () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header d-flex justify-content-center">
        7Apps font-end test!
      </h1>
    </Jumbotron>

    <UserList />
  </Container>
)
