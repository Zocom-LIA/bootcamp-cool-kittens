import React from 'react'
import { motion } from 'framer-motion'

type PrimaryButtonProps = {
    title: string
    action: () => void
    disabled?: boolean
}

export const PrimaryButton = ({title, action, disabled}: PrimaryButtonProps) => {
    return (
        <motion.button className="" onClick={action} disabled={disabled}   >
            {title}
        </motion.button>
    )
}