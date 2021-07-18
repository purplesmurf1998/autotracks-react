import React from 'react'
import {
  CRow,
  CCol,
  CLabel,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const PropertyDetails = ({ property }) => {
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
        <CLabel><b>Options:</b></CLabel>
        {!property.options && <CLabel>No options</CLabel>}
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
        {!property.isRequired && <CLabel>Field cannot be empty</CLabel>}
        {property.isRequired && <CLabel>Field may be empty</CLabel>}
      </CRow>
      <CRow alignHorizontal="end">
        <CButton color="primary"><CIcon name="cil-pencil"/></CButton>
      </CRow>
    </CCol>
   );
}
 
export default PropertyDetails;