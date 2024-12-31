'use client';

import { useUserContext } from '@/context/UserContext';
import React from 'react'

function RecentlyAddedTasks() {

  const {userData}=useUserContext();
  return (
    <div>RecentlyAddedTasks

{userData && userData.tasks.length+""}

    </div>
  )
}

export default RecentlyAddedTasks