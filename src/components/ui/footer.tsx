import { A } from "@solidjs/router";
import { Icon } from "../icon";

export function FooterComponent() {
    return (
        <section class="flex flex-col justify-end">
            <div class="bg-[#ff8c37] flex justify-between items-center">
                <A href="/">
                    <Icon icon="home-circle-outline" text="Home" />
                </A>
                <Icon icon="bell-outline" text="Announcements" />
                <Icon icon="book" text="Homework" />
                <Icon icon="calendar-month-outline" text="Timetable" />
                <Icon icon="calendar-remove-outline" text="Detentions" />
            </div>
        </section>
    )
}