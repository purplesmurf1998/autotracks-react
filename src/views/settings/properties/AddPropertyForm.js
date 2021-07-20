import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CForm,
  CLabel,
  CButton,
  CInput,
  CFormGroup,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';

const AddPropertyForm = ({ getVehicleProperties, setAddVehicleProperty }) => {

  const [headerName, setHeaderName] = useState("");
  const [inputType, setInputType] = useState("");
  const [options, setOptions] = useState([]);
  const [optionsText, setOptionsText] = useState("");
  const [mobileList, setMobileList] = useState(true);
  const [inventoryList, setInventoryList] = useState(true);
  const [isRequired, setIsRequired] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let optionList = [];
    if (inputType == 'Options') {
      optionList = optionsText.split(";");
      setOptions(optionList);
    } else {
      setOptions(null);
    }

    const updatedProperty = {
      headerName,
      inputType,
      options: optionList.length > 0 ? optionList : null,
      mobileList,
      inventoryList,
      isRequired,
      dealership: '60df22510a17a047b04daa11'
    }

    
    axios({
      method: 'post',
      url: `/api/v1/vehicles/properties/models`,
      data: updatedProperty,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(results => {
      if (results.data.success) {
        setAddVehicleProperty(false)
        getVehicleProperties();
      }
    }).catch(err => {
      console.error(err);
    })
    
  }

  return (
      <CForm onSubmit={handleFormSubmit}>
        <CFormGroup row>
          <CCol sm="6">
            <CLabel htmlFor="headerName"><b>Header Name:</b></CLabel>
          </CCol>
          <CCol sm="6">
            <CInput value={headerName} className="form-control-sm" id="headerName" onChange={(e) => setHeaderName(e.target.value)}/>
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol sm="6">
            <CLabel htmlFor="inputType"><b>Input Type:</b></CLabel>
          </CCol>
          <CCol sm="6">
            <CSelect className="form-control-sm" custom name="inputType" id="inputType" value={inputType} onChange={(e) => setInputType(e.target.value)}>
              <option value="">Select an option</option>
              <option value="Text">Text</option>
              <option value="Currency">Currency</option>
              <option value="Date">Date</option>
              <option value="Options">Options</option>
              <option value="List">List</option>
            </CSelect>
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol sm="6">
            <CLabel htmlFor="options"><b>Options:</b></CLabel>
          </CCol>
          <CCol sm="6">
            <CInput className="form-control-sm" id="options" disabled={inputType != "Options"} value={optionsText} onChange={(e) => setOptionsText(e.target.value)}/>
            {inputType === "Options" && <p className="help-block">{"Enter list of options using ; as the delimiter. Ex: Showroom;Demoline;Rental"}</p>}
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol sm="6">
            <CLabel htmlFor="mobileList"><b>Mobile List Visible:</b></CLabel>
          </CCol>
          <CCol sm="6">
            <CSelect className="form-control-sm" custom name="mobileList" id="mobileList" value={mobileList} onChange={(e) => setMobileList(e.target.value)}>
              <option value={true}>Visible</option>
              <option value={false}>Not Visible</option>
            </CSelect>
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol sm="6">
            <CLabel htmlFor="inventoryList"><b>Inventory List Visible:</b></CLabel>
          </CCol>
          <CCol sm="6">
            <CSelect className="form-control-sm" custom name="inventoryList" id="inventoryList" value={inventoryList} onChange={(e) => setInventoryList(e.target.value)}>
              <option value={true}>Visible</option>
              <option value={false}>Not Visible</option>
            </CSelect>
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol sm="6">
            <CLabel htmlFor="isRequired"><b>Field Required:</b></CLabel>
          </CCol>
          <CCol sm="6">
            <CSelect className="form-control-sm" custom name="isRequired" id="isRequired" value={isRequired} onChange={(e) => setIsRequired(e.target.value)}>
              <option value={true}>Field must have a value</option>
              <option value={false}>Field may be empty</option>
            </CSelect>
          </CCol>
        </CFormGroup>
        <CRow alignHorizontal="end" style={{margin: '0px'}}>
          <CButton color="success" type="submit" className="mr-2">Create</CButton>
          <CButton color="secondary">Cancel</CButton>
        </CRow>
      </CForm>
   );
}
 
export default AddPropertyForm;