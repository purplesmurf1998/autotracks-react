import React, { useState, useEffect } from 'react';
import {
  CRow,
  CCol,
  CButton
} from '@coreui/react'

import PropertyList from './PropertyList';
import PropertyDetails from './PropertyDetails';
import EditProperty from './EditProperty';

const PorpertySettings = () => {

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletedProperty, setDeletedProperty] = useState(false);

  return ( 
    <CRow className="mt-3">
      <CCol>
        <CRow alignHorizontal="center">
          <h3>List of vehicle column headers</h3>
        </CRow>
        <hr></hr>
        <PropertyList setSelectedProperty={setSelectedProperty} selectedProperty={selectedProperty} deletedProperty={ deletedProperty }/>
      </CCol>
      <CCol>
        <CRow alignHorizontal="center">
          <h3>Column header details</h3>
        </CRow>
        <hr></hr>
        {!editingProperty && <PropertyDetails property={selectedProperty} setEditingProperty={setEditingProperty} setDeletedProperty={setDeletedProperty} deletedProperty={ deletedProperty }/>}
        {editingProperty && <EditProperty property={selectedProperty} setEditingProperty={setEditingProperty} setSelectedProperty={ setSelectedProperty }/>}
      </CCol>
    </CRow>
   );
}
 
export default PorpertySettings;