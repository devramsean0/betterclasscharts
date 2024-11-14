export function Icon(props: {text?: string, icon: string}) {
    return (
        <img src={`/src/assets/icons/${props.icon}.svg`} width={50} height={50}/>
    )
}