import { FooterComponent } from "./footer";
import { HeaderComponent } from "./header";

export function Layout(props: {children: any}) {
    return (
        <main class="grid grid-rows-4 h-screen">
            <HeaderComponent />
            <div class="row-span-2">
                {props.children}
            </div>
            <FooterComponent />
        </main>
    )
}