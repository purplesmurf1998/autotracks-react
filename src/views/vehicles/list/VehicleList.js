import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CLabel,
  CRow,
  CLink,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/UsersData'
import axios from 'axios'
import VehicleDetails from '../details/VehicleDetails'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['properties', 'properties', 'role', 'status']

const VehicleList = () => {

  const [vehicles, setVehicles] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnInfo, setColumnInfo] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/vehicles/properties/models',
      params: {
        dealership: '60df22510a17a047b04daa11',
        inventoryList: 'true',
        sort: 'position'
      }
    }).then(colResults => {
      if (colResults.data.success) {
        axios({
          method: 'get',
          url: '/api/v1/vehicles'
        }).then(vehResults => {
          if (vehResults.data.success) {
            formatVehicles(vehResults.data.data, formatColumns(colResults.data.data));
          }
        }).catch(err => {
          console.error(err);
        })
      }
    }).catch(err => {
      console.error(err);
    })
    
  }, [])

  const formatColumns = (list) => {
    const tempColumns = [];
    list.forEach(column => {
      tempColumns.push(column.field);
    })
    setColumns(tempColumns);
    setColumnInfo(list);
    return tempColumns;
  }

  const formatVehicles = (list, cols) => {
    console.log(cols);
    const tempVehicles = [];
    list.forEach(vehicle => {
      const tempVehicle = vehicle;
      cols.forEach(col => {
        tempVehicle[col] = vehicle.properties[col];
      });
      tempVehicles.push(tempVehicle);
    })
    setVehicles(tempVehicles);
  }

  return (vehicles.length > 0 || columns.length > 0) ? (
    <CCard>
      <CCardHeader>
        <CRow alignHorizontal="between" className="pl-3 pr-3">
          <h3 style={{margin: '0', padding: '0'}}>Vehicle Inventory</h3>
          <CButton color="primary" to="/vehicles/add">Add Vehicle</CButton>
        </CRow>
      </CCardHeader>
      <CCardBody>
      <CDataTable
        items={vehicles}
        fields={columns}
        hover
        clickableRows
        bordered
        size="sm"
        itemsPerPage={10}
        pagination
        onRowClick={(item, index) => {
          setSelectedVehicle(item);
          setShowDetails(true);
        }}
      />
      <CModal 
        show={showDetails} 
          onClose={setShowDetails}
          size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Vehicle Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {selectedVehicle && showDetails && <VehicleDetails vehicleId={selectedVehicle._id} dealershipId={selectedVehicle.dealership} />}
        </CModalBody>
      </CModal>
      </CCardBody>
    </CCard>
  ) : (
    <div>Loading</div>
  );
}
 
export default VehicleList;