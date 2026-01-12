import React from 'react'
import Link from 'next/link'
import { cn } from 'shared/lib/utils'
import { Container } from './container'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from '@components/ui'
import { PAGES } from 'shared/services/pages-routes'



export const NavBar = () => {
  return (
    <nav className="bg-red-600 p-4">
      <Container className="flex justify-center">
        <NavigationMenu className="relative flex flex-col items-center">
          <NavigationMenuList className="flex gap-10">

            {PAGES.map(({link, label}) => (
              <NavigationMenuItem key={label} className='py-2 text-white'>
                <Link href={link}>
                  {label}
                </Link>
              </NavigationMenuItem>
            ))}


          </NavigationMenuList>

          <NavigationMenuViewport className="absolute top-full"/>
        </NavigationMenu>

      </Container>
</nav>

  )
}
