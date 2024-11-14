import { Icon } from "../icon";

export function HeaderComponent() {
    return (
        <section class="bg-[#ff8c37] flex justify-between h-fit">
            <h2 class="pl-2 text-2xl">
                Account
                <br />
                Name
            </h2>
            <div class="flex">
                <Icon icon="down-caret" />
                <Icon icon="settings" />
            </div>
        </section>
    )
}