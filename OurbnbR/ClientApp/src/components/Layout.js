import React from 'react';
import { Container } from 'reactstrap';
import { Outlet } from 'react-router-dom';
import { NavMenu } from './NavMenu';

export function Layout (){

    return (
      <div>
            <NavMenu />
            <Container>
                <Outlet />
            </Container>
      </div>
    );
  
}
