import React, { useEffect, useState } from 'react'
import { AutoSizer, Column, Table } from 'react-virtualized'
import { Form, Col, Spinner } from 'react-bootstrap'
import _ from 'lodash'

import { getUsers } from 'services/user'

import 'react-virtualized/styles.css'
import './styles.css'

const WrappedSpinner = () => (
  <div className="d-flex justify-content-center">
    <Spinner animation="border" />
  </div>
)

export default () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      const resp = await getUsers()

      if (resp.status !== 200) {
        return
      }

      const { data: { data } } = resp

      setUsers(data)
      setFilteredUsers(data)
      setLoading(false)
    }

    load()
  }, [])

  const changeSearch = ({ target: { value } }) => {
    setSearch(value)
    debouncedSearch(value)
  }

  const debouncedSearch = _.debounce(s => filterList(s), 800)

  const filterList = (value) => {
    const arrFiltered = users.filter(({ name, age }) => (
      !!name.includes(value) || !!`${age}`.includes(value)
    ))
    setFilteredUsers(arrFiltered)
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="wrapper-p">
        <Form>
          <Form.Row>
            <Col>
              <Form.Control 
                placeholder="Search"
                onChange={changeSearch}
                value={search}
                disabled={!!loading}
              />
            </Col>
          </Form.Row>
        </Form>

        <div className="wrapper-list">
          <AutoSizer>
            {({ width, height }) => (
              <Table
                width={width}
                height={height}
                headerHeight={50}
                rowHeight={30}
                rowCount={filteredUsers.length}
                rowGetter={({ index }) => filteredUsers[index]}
                noRowsRenderer={() => loading ? <WrappedSpinner /> : null}
              >
                <Column label='Name' dataKey='name' width={300} />
                <Column label='Age' dataKey='age' width={200} />
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  )
}
