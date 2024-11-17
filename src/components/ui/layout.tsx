import { Icon } from "../icon";
import { FooterComponent } from "./footer";
import { HeaderComponent } from "./header";

export function Layout(props: {title: string, switcherEnabled: boolean, backButton: boolean, children: any}) {
    const navigateBack = () => {
        window.history.back();
    }
    return (
        <main class="flex flex-col h-screen min-h-screen">
            <HeaderComponent switcherEnabled={props.switcherEnabled}/>
            <div class="flex-grow">
                <div class="flex items-center">
                    {props.backButton ? (
                        <div onClick={navigateBack}>
                            <Icon icon="view-back"/>
                        </div>
                    ): (<></>)}
                    <h2 class="text-xl">{props.title}:</h2>
                </div>
                {props.children}
            </div>
            {props.switcherEnabled ? (
                <FooterComponent />
            ): (<></>)}
        </main>
    )
}