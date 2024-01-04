import { motion } from 'framer-motion'
import './style.scss';

type PrimaryButtonProps = {
    title: string
    className: string
    action: () => void
    disabled?: boolean
}

export const PrimaryButton = ({title, className, action, disabled}: PrimaryButtonProps) => {
    return (
        <motion.button className={`primary__button ${className}`} onClick={action} disabled={disabled} whileTap={{scale: 0.95}}  >
            {title}
        </motion.button>
    )
}