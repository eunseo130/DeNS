export default function MessageBox(props) {
    console.log("chjeck");
    return (
        <>
            <hr/>
            <p>{props.data.sender}</p>
            <p>{props.data.message}</p>
        </>


    )


}