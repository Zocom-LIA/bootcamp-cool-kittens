import {motion} from "framer-motion"

type QtyButtonProps = {
    title: string
    action: () => void
    disabled?: boolean
}

export const QtyButton = ({title, action, disabled}: QtyButtonProps) => {
    return (
        <motion.button className="" onClick = {action} disabled={disabled}>
            {title}
        </motion.button>
    )
}