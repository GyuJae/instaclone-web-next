import React from 'react'
import Link from 'next/link'
import InstaLogo from '@assets/images/logo.png'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href='/'>
      <a>
        <Image src={InstaLogo} alt="Instagram logo" width={120} height={40} />
      </a>
    </Link>
  )
}

export default Logo