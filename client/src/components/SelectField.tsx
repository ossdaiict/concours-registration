import React, { useContext } from 'react'
import { FieldProps } from 'formik'
import Select from 'react-select'
import { CostContext } from '../context/CostContext'

const SelectField: React.SFC<any & FieldProps> = ({
  options,
  field,
  form,
  multi,
}) => {
  const { setTotal } = useContext(CostContext)

  return (
    <Select
      isMulti={multi}
      options={options}
      name={field.name}
      value={
        options
          ? options.find((option: any) => option.value === field.value)
          : ''
      }
      onChange={(option: any) => {
        if (option) {
          if (multi) {
            form.setFieldValue(field.name, option)
            let sum = option.reduce((sum: any, item: any) => sum + item.cost, 0)
            setTotal(sum)
          } else {
            form.setFieldValue(field.name, option.value)
          }
        }
      }}
      onBlur={field.onBlur}
      className="w-full"
    />
  )
}

export default SelectField
