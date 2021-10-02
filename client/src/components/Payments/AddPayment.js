import React, { useState } from 'react'
import Modal from './Modal'

const AddPayment = () => {

    const [open, setOpen] = useState()

    return (
        <div>
            <Modal open={open} setOpen={setOpen} />
        </div>
    )
}

export default AddPayment
