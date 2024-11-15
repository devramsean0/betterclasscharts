import { Icon } from "../icon";

export function HeaderComponent(props: {switcherEnabled: boolean}) {
    return (
        <section class="bg-[#ff8c37] flex justify-between h-fit">
            {props.switcherEnabled ? (<></>)
            : (
                <div class="text-center">
                    <h1 class="text-2xl">Better Classcharts</h1>
                </div>
            )}
            {props.switcherEnabled ? (
                <h2 class="pl-2 text-2xl">
                    Account
                    <br />
                    Name
                </h2>
            ): (<></>)}
            <div class="flex">
                {props.switcherEnabled ? (
                        <Icon icon="down-caret" />
                ): (<></>)}
                <Icon icon="settings" />
            </div>
        </section>
    )
}