import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CLabel,
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CCardFooter,
  CButton,
  CBadge
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import axios from 'axios';
import VehicleList from '../list/VehicleList';
import EditVehicle from './EditVehicle';

const VehicleDetails = ({ dealershipId, vehicleId }) => {

  const [properties, setProperties] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(false);

  useEffect(() => {
    getProperties();
    getVehicle();
  }, [])

  const getProperties = () => {
    axios({
      method: 'get',
      url: '/api/v1/vehicles/properties/models',
      params: {
        dealership: '60df22510a17a047b04daa11',
        sort: 'position'
      }
    }).then(results => {
      if (results.data.success) {
        setProperties(results.data.data);
      } else {
        console.log(results.data.message);
      }
    }).catch(err => {
      console.error(err);
    })
  }

  const getVehicle = () => {
    axios({
      method: 'get',
      url: `/api/v1/vehicles/${vehicleId}`
    }).then(results => {
      if (results.data.success) {
        setVehicle(results.data.data);
      } else {
        console.log(results.data.message);
      }
    }).catch(err => {
      console.error(err);
    })
  }

  return !properties || !vehicle ? (
    <div>Loading</div>
  ) : (
    <CCol>
      <CCard>
        <CCardHeader>
          <CRow alignHorizontal="between" className="pl-3 pr-3">
            <h5 style={{ margin: '0', padding: '0', lineHeight: '37px' }}>Default Information</h5>
            <CButton color="success"><CIcon name="cil-dollar" className="mr-2"/>Mark as sold</CButton>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CCol>
            <CRow alignHorizontal="between" className="mb-2">
              <CLabel><b>Created At:</b></CLabel>
              <CLabel>{ vehicle.createdAt }</CLabel>
            </CRow>
            <CRow alignHorizontal="between" className="mb-2">
              <CLabel><b>Vehicle Sold:</b></CLabel>
              {vehicle.sold && <CLabel><CBadge color="success">Sold</CBadge></CLabel>}
              {!vehicle.sold && <CLabel><CBadge color="danger">Not Sold</CBadge></CLabel>}
            </CRow>
            <CRow alignHorizontal="between" className="mb-2">
              <CLabel><b>Vehicle Delivered:</b></CLabel>
              {vehicle.delivered && <CLabel><CBadge color="success">Delivered</CBadge></CLabel>}
              {!vehicle.delivered && <CLabel><CBadge color="danger">Not Delivered</CBadge></CLabel>}
            </CRow>
            <CRow alignHorizontal="between" className="mb-2">
              <CLabel><b>Sold By:</b></CLabel>
              <CLabel>{ vehicle.soldBy ? vehicle.soldBy : 'N/A' }</CLabel>
            </CRow>
          </CCol>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          <CRow alignHorizontal="between" className="pl-3 pr-3">
            <h5 style={{ margin: '0', padding: '0', lineHeight: '37px' }}>Vehicle Information</h5>
            {!editingVehicle && <CButton color="primary" onClick={() => setEditingVehicle(true)}><CIcon name="cil-pencil" className="mr-2" />Edit</CButton>}
            {editingVehicle && <CButton color="danger" onClick={() => setEditingVehicle(false)}>Cancel</CButton>}
          </CRow>
        </CCardHeader>
        <CCardBody>
          {editingVehicle && <EditVehicle getVehicle={getVehicle} vehicle={vehicle} properties={ properties } />}
          {!editingVehicle && <CCol>
            {properties.map((prop, index) => {
              const shaded = index % 2 != 0 ? '#FFFFFF' : '#ebedef';
              return prop.inputType == "List" ? (
                <CRow alignHorizontal="between" style={{ backgroundColor: shaded, paddingLeft: '8px', paddingRight: '8px', paddingTop: '8px', borderRadius: '5px' }}>
                  <CLabel><b>{prop.headerName}:</b></CLabel>
                  <CCol style={{ padding: '0' }} className="text-right">
                    {vehicle.properties[prop.field].map(item => {
                      return <p key={item} style={{ margin: '0', padding: '0', paddingBottom: '8px' }}>{item}</p>
                    })}
                  </CCol>
                </CRow>
              ) : (
                <CRow alignHorizontal="between" style={{ backgroundColor: shaded, paddingLeft: '8px', paddingRight: '8px', paddingTop: '8px', borderRadius: '5px' }}>
                  <CLabel><b>{prop.headerName}:</b></CLabel>
                  <CLabel>{vehicle.properties[prop.field]}</CLabel>
                </CRow>
              )
            })}
          </CCol>}
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          <CRow alignHorizontal="between" className="pl-3 pr-3">
            <h5 style={{ margin: '0', padding: '0', lineHeight: '37px' }}>Vehicle Location</h5>
            <CButton color="primary"><CIcon name="cil-pencil" className="mr-2"/>Edit</CButton>
          </CRow> 
        </CCardHeader>
        <CCardBody>
          
        </CCardBody>
      </CCard>
    </CCol>
   );
}
 
export default VehicleDetails;