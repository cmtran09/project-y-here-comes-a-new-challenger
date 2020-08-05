import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)
  
  const handleItemClick = (e, { name }) => setActiveItem(name)

  console.log('nav')

  return (
    <Menu pointing secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Item
        name='login'
        active={activeItem === 'login'}
        onClick={handleItemClick}
        as={Link}
        to='/login'
      />
      <Menu.Item
        name='register'
        active={activeItem === 'register'}
        onClick={handleItemClick}
        as={Link}
        to='/register'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={handleItemClick}
          as={Link}
          to='/logout'
        />
      </Menu.Menu>
    </Menu>
  )
}
