import React, { useContext } from 'react'
import { FieldProps } from 'formik'
import Select from 'react-select'
import { CostContext } from '../CostContext'

const SelectField: React.SFC<any & FieldProps> = ({ options, field, form }) => {
  //@ts-ignore
  const { setTotal } = useContext(CostContext)

  return (
    <Select
      isMulti
      options={options}
      name={field.name}
      value={
        options
          ? options.find((option: any) => option.value === field.value)
          : ''
      }
      onChange={(option: any) => {
        if (option) {
          form.setFieldValue(field.name, option)
          let sum = option.reduce((sum: any, item: any) => sum + item.cost, 0)
          setTotal(sum)
        }
      }}
      onBlur={field.onBlur}
      className="w-full"
    />
  )
}

export default SelectField
