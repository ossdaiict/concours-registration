import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'College Name', accessor: 'collegeName' },
  { Header: 'Contact No,', accessor: 'contactNo' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Sports', accessor: 'sports' },
  { Header: 'Accommodation', accessor: 'accommodation' },
  { Header: 'Preferred Payment', accessor: 'prefPayment' },
  { Header: 'Total Cost', accessor: 'totalCost' },
]

const Admin: React.FC = () => {
  const [state, setState] = useState({ data: [] })

  useEffect(() => {
    let temp: any = sessionStorage.getItem('PASSWORD')
    if (!temp) {
      temp = window.prompt('Please enter password:')
    }
    axios
      .post(`${API_URL}/register/details`, { password: temp })
      .then(res => {
        sessionStorage.setItem('PASSWORD', temp)
        const sanitizedData = res.data.map((item: any) => {
          const sportsString = item.sports.map(
            (sport: any) => `${sport.label}, `
          )
          return { ...item, sports: sportsString }
        })
        setState({ data: sanitizedData })
      })
      .catch(err => window.alert('Something went wrong.'))
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: 40, padding: 20 }}>Registrations</p>
      <div style={{ padding: '0 70px 70px 70px' }}>
        {state.data ? (
          <ReactTable data={state.data} columns={columns} minRows={10} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Admin
