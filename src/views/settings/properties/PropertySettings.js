import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CButton
} from '@coreui/react'

import PropertyList from './PropertyList';
import PropertyDetails from './PropertyDetails';

const PorpertySettings = () => {

  const [selectedProperty, setSelectedProperty] = useState(null);

  return ( 
    <CRow className="mt-3">
      <CCol>
        <CRow alignHorizontal="center">
          <h3>List of vehicle column headers</h3>
        </CRow>
        <hr></hr>
        <PropertyList setSelectedProperty={ setSelectedProperty }/>
        <CRow className="mt-3" alignHorizontal="center">
          <CButton color="primary">Add Vehicle Column</CButton>
        </CRow>
      </CCol>
      <CCol>
        <CRow alignHorizontal="center">
          <h3>Column header details</h3>
        </CRow>
        <hr></hr>
        <PropertyDetails property={selectedProperty} />
      </CCol>
    </CRow>
   );
}
 
export default PorpertySettings;