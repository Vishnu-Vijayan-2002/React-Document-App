import React from 'react'
import { Navbar,Container } from 'react-bootstrap'


function Header() {
  return (
  <>
  <Navbar>
  <Container>
    <Navbar.Brand>
     <h2 style={{marginLeft:'500px',fontWeight:'600'}} className='text-center'>Document App</h2>
    </Navbar.Brand>
  </Container>
</Navbar>
  
  </>
  )
}

export default Header