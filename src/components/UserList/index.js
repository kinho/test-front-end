import React, { useEffect, useState } from 'react'
import { AutoSizer, Column, Table } from 'react-virtualized'
// import styled from 'styled-components'

import { Form, Col } from 'react-bootstrap'

import { getUsers } from '../../services/user'

import 'react-virtualized/styles.css'
import './styles.css'

export default () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const load = async () => {
      const resp = await getUsers()

      if (resp.status !== 200) {
        alert('error')
      }

      const { data: { data } } = resp

      console.log('users', data)
      setUsers(data)
    }

    load()
  }, [])

  return (
    <div class="d-flex justify-content-center">
      <div class="wrapper-p">
        <Form>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Search by Name" />
            </Col>
            <Col>
              <Form.Control placeholder="Search by Age" />
            </Col>
          </Form.Row>
        </Form>

        <div className="wrapper-list">
          <AutoSizer>
            {
              ({ width, height }) => (
                <Table
                  width={width}
                  height={height}
                  headerHeight={50}
                  rowHeight={30}
                  rowCount={users.length}
                  rowGetter={({ index }) => users[index]}
                >
                  <Column
                    label='Name'
                    dataKey='name'
                    width={300}
                  />
                  <Column
                    label='Age'
                    dataKey='age'
                    width={100}
                  />
                </Table>
              )
            }
          </AutoSizer>
        </div>
      </div>
    </div>
  )
}
