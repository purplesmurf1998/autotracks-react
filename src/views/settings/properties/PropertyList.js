import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCol,
  CCardBody,
  CRow,
  CButton,
  CContainer
} from '@coreui/react'
import axios from 'axios';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const PropertyList = (props) => {

  const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveOrder, setSaveOrder] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    getVehicleProperties();
  }, [])

  const getVehicleProperties = () => {
    axios({
      method: 'get',
      url: '/api/v1/vehicles/properties/models',
      params: {
        dealershipId: '60df22510a17a047b04daa11',
        sort: 'position'
      }
    }).then(results => {
      setPropertyList(results.data.data);
      setLoading(false);
      setSavingOrder(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
      setSavingOrder(false);
    });
  }

  const saveOrderChanges = () => {
    setSaveOrder(false);
    setSavingOrder(true);
    propertyList.forEach((property, index) => {
      axios({
        method: 'put',
        url: `/api/v1/vehicles/properties/models/${property._id}`,
        data: {
          position: index + 1
        }
      }).then(results => {
        if (!results.data.success) {
          console.error(`Error updating property ${property._id} at index ${index}`);
        }
      }).catch(err => {
        console.log(err);
      })
    });
    getVehicleProperties();
  }

  const onDragEnd = results => {
    //TODO: implement on drag end for sorting the list
    console.log(results);
    const { destination, source, draggableId } = results;
    console.log(propertyList);
    let tempPropertyList = propertyList;
    const sourceProperty = tempPropertyList[source.index];
    console.log(sourceProperty);
    tempPropertyList.splice(source.index, 1);
    tempPropertyList.splice(destination.index, 0, sourceProperty);

    setPropertyList(tempPropertyList);
    setSaveOrder(true);
  }
  
  return loading ? (
    <CContainer />
  ) : (
    <DragDropContext onDragEnd={onDragEnd}>
      <CCol>
        <CRow alignHorizontal="center">
            {saveOrder && <CButton color="success" onClick={saveOrderChanges}>Save Order</CButton>}
            {savingOrder && <p>Saving vehicle column order</p>}
          </CRow>
        <Droppable droppableId="vehicle-table-columns">
          {(provided) => {
            return <CCol innerRef={provided.innerRef} {...provided.droppableProps}>
              {propertyList.map((property, index) => {
                return <Draggable draggableId={property._id} index={index} key={property._id}>
                  {(provided) => {
                    return <CCard
                      className="mt-2"
                      href="#"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      innerRef={provided.innerRef}
                      onClick={() => props.setSelectedProperty(property)}
                    >
                      <CCardBody>
                        <CRow alignHorizontal="between" className="pl-3 pr-3 pb-0">
                          <p style={{margin: '0', padding: '0'}}>{property.headerName}</p>
                          <h6 style={{margin: '0', padding: '0'}}>Position: {property.position}</h6>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  }}
                </Draggable>
              })}
              {provided.placeholder}
            </CCol>
          }}
        </Droppable> 
      </CCol>
    </DragDropContext>
  );
}
 
export default PropertyList;