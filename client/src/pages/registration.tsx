import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Grid, Row } from 'react-flexbox-grid'
import axios from 'axios'
import { toast } from 'react-toastify'
import { year } from '../meta.json'
import SelectField from '../components/SelectField'
import { CostContext } from '../context/CostContext'
import 'react-toastify/dist/ReactToastify.css'
import './registration.css'

toast.configure()

const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const sportsOptions = [
  { label: 'Badminton(Boys)', value: 'Badminton(Boys)', cost: 1800 },
  { label: 'Badminton(Girls)', value: 'Badminton(Girls)', cost: 1200 },
  { label: 'Basketball(Boys)', value: 'Basketball(Boys)', cost: 1600 },
  { label: 'Basketball(Girls)', value: 'Basketball(Girls)', cost: 1200 },
  { label: 'Chess', value: 'Chess', cost: 1200 },
  { label: 'Carrom', value: 'Carrom', cost: 1200 },
  { label: 'Cricket(Boys)', value: 'Cricket(Boys)', cost: 4000 },
  { label: 'Cricket(Girls)', value: 'Cricket(Girls)', cost: 1200 },
  { label: 'Volleyball(Boys)', value: 'Volleyball(Boys)', cost: 1800 },
  { label: 'Volleyball(Girls)', value: 'Volleyball(Girls)', cost: 1200 },
  { label: 'Football(Boys)', value: 'Football(Boys)', cost: 2800 },
  { label: 'Football(Girls)', value: 'Football(Girls)', cost: 1400 },
  { label: 'Table Tennis(Boys)', value: 'Table Tennis(Boys)', cost: 1800 },
  { label: 'Table Tennis(Girls)', value: 'Table Tennis(Girls)', cost: 1200 },
  { label: 'Lawn Tennis(Boys)', value: 'Lawn Tennis(Boys)', cost: 1600 },
  { label: 'Lawn Tennis(Girls)', value: 'Lawn Tennis(Girls)', cost: 1200 },
]

const paymentOptions = [
  { label: 'Cash', value: 'Cash' },
  { label: 'Bank Transfer', value: 'Bank Transfer' },
]

function onKeyDown(keyEvent: any) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault()
  }
}

const Registration: React.FC = () => {
  const [total, setTotal] = useState(0)

  return (
    <Grid fluid className="App">
      <br />
      <span className="text-5xl font-bold">Concours Registration {year}</span>

      <CostContext.Provider
        //@ts-ignore
        value={{ total, setTotal }}
      >
        <Formik
          initialValues={{
            name: '',
            collegeName: '',
            contactNo: '',
            email: '',
            accommodation: 0,
            prefPayment: '',
            sports: [],
          }}
          onSubmit={async (values, actions) => {
            const data = {
              ...values,
              totalCost: total,
            }
            await axios({
              method: 'post',
              url: `${API_URL}/register`,
              data,
            })
              .then(res => toast.success('Successfully Registered'))
              .catch(err =>
                toast.error('Something went wrong. Please try again.')
              )
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form
              style={{ textAlign: 'left', fontSize: 20 }}
              onKeyDown={onKeyDown}
            >
              <Row className="m-5">
                <label>Name (contingent leader/captain of team)</label>
                <Field
                  type="text"
                  name="name"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  required
                />
                <ErrorMessage name="name" component="div" />
              </Row>
              <Row className="m-5">
                <label>College Name</label>
                <Field
                  type="text"
                  name="collegeName"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  required
                />
                <ErrorMessage name="collegeName" component="div" />
              </Row>
              <Row className="m-5">
                <label>Contact No.</label>
                <Field
                  type="number"
                  name="contactNo"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  required
                />
                <ErrorMessage name="contactNo" component="div" />
              </Row>
              <Row className="m-5">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  required
                />
                <ErrorMessage name="email" component="div" />
              </Row>
              <Row className="m-5">
                <label htmlFor="accommodation">
                  Accommodation (leave blank if not needed)
                </label>
                <Field
                  type="number"
                  name="accommodation"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  required
                />
              </Row>

              <Row className="m-5">
                <label htmlFor="sports">Sports</label>
                <Field
                  name="sports"
                  component={SelectField}
                  options={sportsOptions}
                  multi={true}
                  required
                />
              </Row>
              <Row className="m-5">
                <label htmlFor="prefPayment">Preferred Payment Method</label>
                <Field
                  type="select"
                  component={SelectField}
                  options={paymentOptions}
                  name="prefPayment"
                  multi={false}
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </Field>
              </Row>
              <Row className="m-5">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  type="submit"
                >
                  Submit
                </button>
                <div style={{ marginLeft: 50, marginTop: 10 }}>
                  Total Payment for Registration: {total}
                </div>
              </Row>
            </Form>
          )}
        />
      </CostContext.Provider>
      <br />
    </Grid>
  )
}

export default Registration
