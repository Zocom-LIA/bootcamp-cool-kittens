import {motion} from "framer-motion"
import './style.scss'

type QtyButtonProps = {
    title: string
    action: () => void
    disabled?: boolean
}

export const QtyButton = ({title, action, disabled}: QtyButtonProps) => {
    return (
        <motion.button className="button--quantity" onClick = {action} disabled={disabled}>
            {title}
        </motion.button>
    )
}