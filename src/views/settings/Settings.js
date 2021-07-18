import React, { useState } from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader
} from '@coreui/react'

const LocationSettings = React.lazy(() => import('./locations/LocationSettings'));
const PorpertySettings = React.lazy(() => import('./properties/PropertySettings'))

const Settings = () => {
  const [active, setActive] = useState(1)
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'

  return (
    <CCard>
      <CCardBody>
        <CTabs>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>
                Payment Information
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                Manage Users
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                Vehicle Properties
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                Manage Locations
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane>
              {`1. ${lorem}`}
            </CTabPane>
            <CTabPane>
              {`2. ${lorem}`}
            </CTabPane>
            <CTabPane>
              <PorpertySettings />
            </CTabPane>
            <CTabPane>
              <LocationSettings />
            </CTabPane>
          </CTabContent>
        </CTabs>
      </CCardBody>
    </CCard>
  )
}

export default Settings
