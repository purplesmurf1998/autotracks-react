import React from 'react'
import {
  CRow,
  CCol,
  CLabel,
  CButton
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import axios from 'axios'

const PropertyDetails = ({ property, setEditingProperty }) => {

  const handleDelete = () => {
    console.log("Test");
    axios({
      method: 'delete',
      url: `/api/v1/vehicles/properties/models/${property._id}`
    }).then(results => {
      // refresh properties list somehow
      console.log(results.data.data)
    }).catch(err => {
      console.error(err);
    });
  }

  return !property ? (
    <CRow alignHorizontal="center">
      <p>Select a vehicle column header to view the details</p>
    </CRow>
  ) : (
    <CCol>
      <CRow alignHorizontal="between">
        <CLabel><b>Header Name:</b></CLabel>
        <CLabel>{ property.headerName }</CLabel>
      </CRow>
      <CRow alignHorizontal="between">
        <CLabel><b>Input Type:</b></CLabel>
        <CLabel>{ property.inputType }</CLabel>
      </CRow>
      <CRow alignHorizontal="between">
        <CLabel><b>Mobile List Visible:</b></CLabel>
        {!property.mobileList && <CLabel>Not visible</CLabel>}
        {property.mobileList && <CLabel>Visible</CLabel>}
      </CRow>
      <CRow alignHorizontal="between">
        <CLabel><b>Inventory List Visible:</b></CLabel>
        {!property.inventoryList && <CLabel>Not visible</CLabel>}
        {property.inventoryList && <CLabel>Visible</CLabel>}
      </CRow>
      <CRow alignHorizontal="between">
        <CLabel><b>Field Required:</b></CLabel>
        {property.isRequired && <CLabel>Field cannot be empty</CLabel>}
        {!property.isRequired && <CLabel>Field may be empty</CLabel>}
      </CRow>
      <CRow alignHorizontal="between">
        <CLabel><b>Options:</b></CLabel>
        {!property.options && <CLabel>No options</CLabel>}
          {property.options && <CCol style={{ padding: '0' }} className="text-right">
            {property.options.map(option => {
              return <p key={option} style={{margin: '0', padding: '0', paddingBottom: '8px'}}>{option}</p>
            })}
        </CCol>}
      </CRow>
      <CRow alignHorizontal="start">
          <CButton className="mr-2" color="primary" onClick={() => setEditingProperty(true)}><CIcon name="cil-pencil" className="mr-2" />Modify Vehicle Column</CButton>
          <CButton color="danger" onClick={handleDelete}><CIcon name="cil-trash" className="mr-2"/>Delete</CButton>
      </CRow>
    </CCol>
   );
}
 
export default PropertyDetails;