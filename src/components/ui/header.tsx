
import { A } from "@solidjs/router";
import { useAccount } from "../../contexts/AccountContext";
import { Icon } from "../icon";

export function HeaderComponent(props: {switcherEnabled: Boolean}) {
    const { account } = useAccount();
    return (
        <section class="bg-[#ff8c37] flex justify-between h-fit">
            {props.switcherEnabled ? (<></>)
            : (
                <div class="text-center items-center">
                    <h1 class="text-2xl">Better Classcharts</h1>
                </div>
            )}
            {props.switcherEnabled ? (
                <h2 class="pl-2 text-2xl">
                    {account() ? account().name : "No Account"}
                </h2>
            ): (<></>)}
            <div class="flex">
                {props.switcherEnabled ? (
                    <A href="/account-switcher">
                        <Icon icon="down-caret" />
                    </A>
                ): (<></>)}
                <Icon icon="settings" />
            </div>
        </section>
    )
}