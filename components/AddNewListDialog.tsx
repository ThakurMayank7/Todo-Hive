import React from 'react'

function AddNewListDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full'>{children}</div>
  )
}

export default AddNewListDialog