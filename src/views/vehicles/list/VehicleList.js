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
  CLink
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/UsersData'
import axios from 'axios'

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

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/vehicles/properties/models',
      params: {
        dealershipId: '60df22510a17a047b04daa11',
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
    console.log(tempVehicles);
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
        bordered
        size="sm"
        itemsPerPage={10}
        pagination
        scopedSlots = {{
          'status':
            (item)=>(
              <td>
                <CBadge color={getBadge(item.status)}>
                  {item.status}
                </CBadge>
              </td>
            ),
          'properties':
            (item) => (
              item.properties ? <td>{item.properties.name}</td> : <td>{item.name}</td>
            ),
          'properties':
            (item) => (
              item.properties ? <td>{item.properties.registered}</td> : <td>{item.registered}</td>
            )
        }}
      />
      </CCardBody>
    </CCard>
  ) : (
    <div>Loading</div>
  );
}
 
export default VehicleList;