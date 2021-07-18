import React, { useState } from 'react'
import {
  CCol,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import LocationList from './LocationList'
import LocationDetails from './LocationDetails'
import AddLocationForm from './AddLocationForm'

const LocationSettings = () => {
  
  const [selectedLocation, setSelectedLocation] = useState();
  const [addLocationModal, setAddLocationModal] = useState(false);

  return (
    <CRow className="mt-3">
      <CCol>
        <CRow alignHorizontal="center">
          <h3>List of locations</h3>
        </CRow>
        <hr></hr>
        {/* List of locations registered to this dealership */}
        <LocationList selectedLocation={selectedLocation} setSelectedLocation={ setSelectedLocation }/>
        <CRow className="mt-3" alignHorizontal="center">
          <CButton color="primary" onClick={() => setAddLocationModal(!addLocationModal)}>Add Location</CButton>
        </CRow>
        <CModal 
          show={addLocationModal} 
          onClose={setAddLocationModal}
        >
          <CModalHeader closeButton>
            <CModalTitle>Adding a new location</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <AddLocationForm setAddLocationModal={ setAddLocationModal }/>
          </CModalBody>
        </CModal>
      </CCol>
      <CCol>
        <CRow alignHorizontal="center">
          <h3>Location details</h3>
        </CRow>
        <hr></hr>
        {/* Map showing the currently selected location */}
        <LocationDetails selectedLocation={ selectedLocation }/>
          {/* <MapContainer center={[45.5017, -73.5673]} zoom={10} scrollWheelZoom={false} style={{height: '300px'}}>
            <TileLayer
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
              url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
              id="mapbox/streets-v11"
              accessToken="pk.eyJ1IjoiY2VkcmlrZHVib2lzIiwiYSI6ImNrcjJrODU4MTJjaGwybmxmaXFwcjFkY3QifQ.qKjy0ePOwb65A1iEkgAYxQ"
              tileSize={512}
              zoomOffset={-1}
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer> */}
      </CCol>
    </CRow>
  )
}

export default LocationSettings
