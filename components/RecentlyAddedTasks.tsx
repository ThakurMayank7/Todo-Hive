'use client';

import { useUserContext } from '@/context/UserContext';
import { Task } from '@/lib/types';
import React, { useEffect, useState } from 'react'

function RecentlyAddedTasks() {
  
  const { userData } = useUserContext();

  

  return (
    <div>
      <h1>User Data:</h1>

{userData?.tasks.map(task=>(
  <div key={task.taskId}>{task.taskName}</div>
))}


      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  )
}

export default RecentlyAddedTasks