import React, { useState } from 'react'
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CButton
} from '@coreui/react'

const AddLocationForm = (props) => {
  
  return (
    <CCol>
      <CRow>
        <CCol xs="12">
          <CFormGroup>
            <CLabel htmlFor="name">Name</CLabel>
            <CInput id="name" placeholder="Enter the location name" required />
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CFormGroup>
            <CLabel htmlFor="ccnumber">Description</CLabel>
            <CTextarea 
              name="textarea-input" 
              id="textarea-input" 
              rows="4"
              placeholder="Location description (optional)" 
            />
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CFormGroup>
            <CLabel htmlFor="address">Address</CLabel>
            <CInput id="address" placeholder="Ex. 1234 Belmont, St-Hubert, Qc" required />
          </CFormGroup>
        </CCol>
      </CRow>
      <CCol>
        <CRow alignHorizontal="end">
          <CButton color="success" className="mr-2">Submit</CButton>
          <CButton color="secondary" onClick={() => props.setAddLocationModal(false)}>Cancel</CButton>
        </CRow>
      </CCol>
    </CCol>
  )
}

export default AddLocationForm
