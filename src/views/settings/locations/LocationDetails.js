import React, { useState, useEffect } from 'react'
import {
  CListGroup,
  CListGroupItem,
  CCard,
  CCardBody,
  CCardHeader,
  CRow
} from '@coreui/react'

const LocationDetails = (props) => {
  
  return !props.selectedLocation ? (
    <CRow alignHorizontal="center">
      <p>Select a location to view the details</p>
    </CRow>
  ) : (
    <CCard>
      <CCardHeader>
        {props.selectedLocation}
      </CCardHeader>
    </CCard>
   );
}
 
export default LocationDetails;