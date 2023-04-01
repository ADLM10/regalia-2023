import React from 'react'
import { Navbar,Button } from 'flowbite-react'
import Image from 'next/image'
const navbar = () => {
  return (
    <>
        <Navbar className='navbar'
  fluid={true}
  rounded={true}
>
  <Navbar.Brand href="https://regalia2022.co/">
    <Image
      src={'/../public/images/regalia-guitar.png'}
      alt=""
      width={150}
      height={150}
      style={{ filter: 'invert(1)' }}
    />
    {/* <span className="self-center text-4xl whitespace-nowrap dark:text-white">
      Regalia
    </span> */}
  </Navbar.Brand>
  <div className="flex md:order-2">
    <Button>
      Register
    </Button>
    <Navbar.Toggle />
  </div>
  <Navbar.Collapse>
    <Navbar.Link
      href="/navbars"
      active={true}
    >
      Home
    </Navbar.Link>
    <Navbar.Link href="/dashboard">
      About
    </Navbar.Link>
    <Navbar.Link href="/events">
      Events
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Sponsors
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Contact
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>
    </>
  )
}

export default navbar