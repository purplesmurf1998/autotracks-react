import React, { useState } from 'react';
import { CCol, CForm, CFormGroup, CLabel, CInput } from '@coreui/react'

const EditVehicle = ({ getVehicle, properties, vehicle }) => {
  console.log('test');
  return (
    <CForm>
      {properties.map((prop, index) => {
        switch (prop.inputType) {
          case 'Text': {
            return (
              <CFormGroup row>
                <CCol sm="6">
                  <CLabel htmlFor={prop.field}><b>{ prop.headerName }</b></CLabel>
                </CCol>
                <CCol sm="6">
                  <CInput defaultValue={vehicle.properties[prop.field]} className="form-control-sm" id={ prop.field } />
                </CCol>
              </CFormGroup>
            )
          } break;
        }
        
      })}
      
    </CForm>
   );
}
 
export default EditVehicle;