type DipItemProps = {
    id: string,
    title: string, 
    price: number,
}

export const DipOption = ({id, title, price}: DipItemProps) => {
    return (
        <button onClick={() => console.log("click", id, price)
        }>{title}</button>
    )
}