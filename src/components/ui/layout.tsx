import { FooterComponent } from "./footer";
import { HeaderComponent } from "./header";

export function Layout(props: {title: string, switcherEnabled: boolean, children: any}) {
    return (
        <main class="flex flex-col h-screen min-h-screen">
            <HeaderComponent switcherEnabled={props.switcherEnabled} />
            <div class="flex-grow">
                <h2 class="text-xl">{props.title}:</h2>
                {props.children}
            </div>
            {props.switcherEnabled ? (
                <FooterComponent />
            ): (<></>)}
        </main>
    )
}