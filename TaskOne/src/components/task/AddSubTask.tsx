import React from 'react';

interface AddSubTaskProps {
  open: boolean;
  setOpen: (value: boolean) => void; // Function to toggle open state
  id: string; // ID of the task
}

function AddSubTask({ open, setOpen, id }: AddSubTaskProps) {
  return (
    <>
    </>
  )
}

export default AddSubTask