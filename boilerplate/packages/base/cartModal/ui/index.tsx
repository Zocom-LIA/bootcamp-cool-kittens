import React, {useContext, useEffect} from "react"
// import AppContext from "../../../core/context/AppContext"

export const CartModal = ({isOpen, closeModal}) => {
    // const {cart, setCart} = useContext(AppContext)

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (e.key === "Escape") {
            closeModal();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeModal]);

    return (
        <>
            {isOpen && (
                <h1>This is an open Cart</h1>
            )}
        </>
    )
}