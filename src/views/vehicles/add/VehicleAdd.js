import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CInput,
  CSelect,
  CLabel,
  CButton,
  CAlert
} from '@coreui/react'
import axios from 'axios';

const VehicleAdd = () => {

  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/vehicles/properties/models',
      params: {
        dealership: '60df22510a17a047b04daa11',
        sort: 'position'
      }
    }).then(results => {
      if (results.data.success) {
        console.log(results.data.data);
        setFields(results.data.data);
        setLoading(false);
      } else {
        console.log(results.data.message);
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
    })
  }, [])

  const handleFormSubmit = (e) => {
    console.log(e.target.dateArrived.value);
    e.preventDefault();
    const properties = {}
    fields.forEach(field => {
      properties[field.field] = e.target[field.field].value
    })
    console.log(properties);
    setSuccess('Vehicle added successfully.')
    e.target.reset();
    setTimeout(() => {
      setSuccess(null);
    }, 3000)
  }

  return loading ? (
    <div>Loading</div>
  ) : (
    <CRow>
      <CCol>
        {success && <CAlert color="success">
          {success}
        </CAlert>}
        <CCard>
          <CCardHeader>
            <h3 style={{margin: '0', padding: '0'}}>Add New Vehicle</h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleFormSubmit}>
              {fields.map((field, index) => {
                switch (field.inputType) {
                  case 'Text':
                    return <CCol xs="sm-12">
                      <CFormGroup key={`${field.field}-${index}`}>
                        <CLabel key={index}>{field.headerName}</CLabel>
                        <CInput key={field.field} id={field.field} name={field.field} type="text" required={field.isRequired}></CInput>
                      </CFormGroup>
                    </CCol>
                    break;
                  case 'Currency':
                    return <CCol xs="sm-12">
                      <CFormGroup key={`${field.field}-${index}`}>
                        <CLabel key={index}>{field.headerName}</CLabel>
                        <CInput key={field.field} id={field.field} name={field.field} type="number" required={field.isRequired}></CInput>
                      </CFormGroup>
                    </CCol>
                    break;
                  case 'Date':
                    return <CCol xs="sm-4">
                      <CFormGroup key={`${field.field}-${index}`}>
                        <CLabel key={index}>{field.headerName}</CLabel>
                        <CInput type="date" key={field.field} id={field.field} name={field.field} placeholder="date" required={field.isRequired}/>
                      </CFormGroup>
                    </CCol>
                    break;
                  case 'Options':
                    return <CCol xs="sm-12">
                      <CFormGroup key={`${field.field}-${index}`}>
                        <CLabel key={index}>{field.headerName}</CLabel>
                        <CSelect key={field.field} id={field.field} name={field.field} required={field.isRequired}>
                          <option value=''>Select an option</option>
                          {field.options.map(option => {
                            return <option value={option}>{option}</option>
                          })}
                        </CSelect>
                      </CFormGroup>
                    </CCol>
                    break;
                  case 'List':
                    return <CCol xs="sm-12">
                      <CFormGroup key={`${field.field}-${index}`}>
                        <CLabel key={index}>{field.headerName}</CLabel>
                        <CInput key={field.field} id={field.field} name={field.field} type="text" required={field.isRequired}></CInput>
                        <p className="help-block">{"Enter list of options using ; as the delimiter. Ex: Showroom;Demoline;Rental"}</p>
                      </CFormGroup>
                    </CCol>
                    break;
                  default:
                    return <CCol xs="sm-12">
                      <CFormGroup key={`${field.field}-${index}`}>
                        <CLabel key={index}>{field.headerName}</CLabel>
                        <CInput key={field.field} id={field.field} name={field.field} type="text" required={field.isRequired}></CInput>
                      </CFormGroup>
                    </CCol>
                    break;
                }  
                  
              })}
              <CCol>
                <CButton type="submit" color="success">Add Vehicle</CButton>
              </CCol>  
            </CForm>
          </CCardBody>
        </CCard>
        </CCol>
        <CCol>
          
        </CCol>
    </CRow>
   );
}
 
export default VehicleAdd;