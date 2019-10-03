import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Grid, Row } from 'react-flexbox-grid'
import { year } from './meta.json'
import axios from 'axios'
import SelectField from './components/SelectField'
import { CostContext } from './CostContext'
import './App.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const sportsOptions = [
  { label: 'Badminton(Boys)', value: 'Badminton(Boys)', cost: 1800 },
  { label: 'Badminton(Girls)', value: 'Badminton(Girls)', cost: 1200 },
  { label: 'Basketball(Boys)', value: 'Basketball(Boys)', cost: 1600 },
  { label: 'Basketball(Girls)', value: 'Basketball(Girls)', cost: 1200 },
  { label: 'Chess(Boys)', value: 'Chess(Boys)', cost: 1200 },
  { label: 'Chess(Girls)', value: 'Chess(Girls)', cost: 1200 },
  { label: 'Carrom(Boys)', value: 'Carrom(Boys)', cost: 1200 },
  { label: 'Carrom(Girls)', value: 'Carrom(Girls)', cost: 1200 },
  { label: 'Cricket(Boys)', value: 'Cricket(Boys)', cost: 4000 },
  { label: 'Cricket(Girls)', value: 'Cricket(Girls)', cost: 1200 },
  { label: 'Volleyball(Boys)', value: 'Volleyball(Boys)', cost: 1800 },
  { label: 'Volleyball(Girls)', value: 'Volleyball(Girls)', cost: 1200 },
  { label: 'Football(Boys)', value: 'Football(Boys)', cost: 2800 },
  { label: 'Football(Girls)', value: 'Football(Girls)', cost: 1400 },
  { label: 'Table Tennis(Boys)', value: 'Table Tennis(Boys)', cost: 1600 },
  { label: 'Table Tennis(Girls)', value: 'Table Tennis(Girls)', cost: 1200 },
  { label: 'Tennis(Boys)', value: 'Badminton(Boys)', cost: 1600 },
  { label: 'Tennis(Girls)', value: 'Badminton(Girls)', cost: 1200 },
]

const App: React.FC = () => {
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
            contactNo: 0,
            email: '',
            accommodation: 0,
            prefPayment: 'Cash',
            sports: [],
          }}
          onSubmit={async (values, actions) => {
            await axios({
              method: 'post',
              url: `https://concours-registration.herokuapp.com/register`,
              data: values,
            })
              .then(res => toast.success('Successfully Registered'))
              .catch(err =>
                toast.error('Something went wrong. Please try again.')
              )
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form style={{ textAlign: 'left', fontSize: 20 }}>
              <Row className="m-5">
                <label>Name (contingent leader/captain of team)</label>
                <Field
                  type="text"
                  name="name"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <ErrorMessage name="name" component="div" />
              </Row>
              <Row className="m-5">
                <label>College Name</label>
                <Field
                  type="text"
                  name="collegeName"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <ErrorMessage name="collegeName" component="div" />
              </Row>
              <Row className="m-5">
                <label>Contact No.</label>
                <Field
                  type="number"
                  name="contactNo"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <ErrorMessage name="contactNo" component="div" />
              </Row>
              <Row className="m-5">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <ErrorMessage name="email" component="div" />
              </Row>
              <Row className="m-5">
                <label htmlFor="sports">Sports</label>
                {/* <Select name="sports" options={sportsOptions} /> */}
                <Field
                  name="sports"
                  component={SelectField}
                  options={sportsOptions}
                />
              </Row>
              <Row className="m-5">
                <label htmlFor="accommodation">
                  Accommodation (leave blank if not needed)
                </label>
                <Field
                  type="number"
                  name="accommodation"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
              </Row>
              <Row className="m-5">
                <label htmlFor="prefPayment">Preferred Payment Method</label>
                <Field
                  type="text"
                  name="prefPayment"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
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
    </Grid>
  )
}

export default App
