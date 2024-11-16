export function Icon(props: {text?: string, icon: string}) {
    return (
        <img src={`/icons/${props.icon}.svg`} width={50} height={50}/>
    )
}