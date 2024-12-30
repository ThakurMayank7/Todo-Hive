'use client';

import { useAuth } from '@/hooks/useAuth';
import React, { useEffect } from 'react'

function ClientLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {


    const {user,loading}=useAuth();

    useEffect(()=>{
        if(user && !loading) {

// fetch initially here

        }
    },[user,loading])

if(loading) {
    return <p>loading...</p>
}






  return (
    <>{children}</>
  )
}

export default ClientLayout