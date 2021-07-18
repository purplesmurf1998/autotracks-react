import React, { useState, useEffect } from 'react'
import {
  CListGroup,
  CListGroupItem
} from '@coreui/react'

const LocationList = (props) => {
  return (
    <CListGroup>
      <CListGroupItem
        href="#"
        active={props.selectedLocation === "Location #1"}
        onClick={() => props.setSelectedLocation("Location #1")}
      >Location #1</CListGroupItem>
      <CListGroupItem
        href="#"
        active={props.selectedLocation === "Location #2"}
        onClick={() => props.setSelectedLocation("Location #2")}
      >Location #2</CListGroupItem>
      <CListGroupItem
        href="#"
        active={props.selectedLocation === "Location #3"}
        onClick={() => props.setSelectedLocation("Location #3")}
      >Location #3</CListGroupItem>
      <CListGroupItem
        href="#"
        active={props.selectedLocation === "Location #4"}
        onClick={() => props.setSelectedLocation("Location #4")}
      >Location #4</CListGroupItem>
      <CListGroupItem
        href="#"
        active={props.selectedLocation === "Location #5"}
        onClick={() => props.setSelectedLocation("Location #5")}
      >Location #5</CListGroupItem>
    </CListGroup>
  );
}
 
export default LocationList;