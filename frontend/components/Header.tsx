"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {Plus} from "lucide-react"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
// import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
// import Logout from './Logout'

function Header() {

  const router = useRouter();

  const path = usePathname();
//   const {user, isSignedIn} = useUser();

  const [postAd, setPostAd] = useState('Search Property Address');
  const [width, setWidth] = useState(150)
  const [height, setHeight] = useState(150)

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth <= 768) {
        setPostAd('Post Ad');
        setWidth(150)
        setHeight(150)
      }
      if (window.innerWidth <= 430) {
        setPostAd('Post');
        setWidth(110)
        setHeight(110)
      }
      else {
        setPostAd('Post your Ad');
        setWidth(150)
        setHeight(150)
      }
    };

    updatePlaceholder();

    window.addEventListener('resize', updatePlaceholder);

    return () => window.removeEventListener('resize', updatePlaceholder);
  }, []);

  useEffect(()=> {
    console.log(path);
  },[])

  const navigate = () => {
    if(path !== "/") {
      router.push("/")
    }
  }

  return (
    <div className='p-6 px-10 top-0 w-full z-10 gap-2 bg-white flex justify-between shadow-sm fixed'>
      <div className='flex gap-12 items-center'>
        <Image src={'/next.svg'} alt='logo' className='select-none cursor-pointer' width={width} height={height} onClick={navigate}/>
          <ul className='hidden md:flex gap-10'>
            <Link href={'/'}><li className={`'hover:text-primary font-medium text-sm cursor-pointer ' ${path=='/'&&'text-primary select-none'} select-none`}>For Sell</li></Link>
            <Link href={'/rent'}><li className={`'hover:text-primary font-medium text-sm cursor-pointer ' ${path == '/rent' && 'text-primary select-none'} select-none`}>For Rent</li></Link>
            <li className='hover:text-primary font-medium text-sm cursor-pointer select-none'>Agent Finder</li>
          </ul>
      </div>
      <div className='flex gap-2'>
        <Link href={'/add-new-listing'}>
          <Button className='flex gap-1'><Plus className='h-5'/>{postAd}</Button>
        </Link>
        {/* {isSignedIn ? 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Image src={user?.imageUrl} width={40} height={40} alt='user Image'
          className='rounded-full cursor-pointer select-none'
          />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/user"}>Profile</Link> 
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/user#/my-listing"}>My Listing</Link> 
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Logout/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
           : 
          <Link href={'/sign-in'}>
            <Button variant='outline'>Login</Button>
          </Link>
        } */}
        </div>
    </div>
  )
}

export default Header