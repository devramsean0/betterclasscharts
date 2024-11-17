import { createEffect, createSignal } from "solid-js";
import { useAccount } from "../../../contexts/AccountContext";
import { authFetch } from "../../../lib/authFetch";
import { IBehaviour } from "../../../types/classcharts";

export function BehaviourInformation() {
    const { account } = useAccount();
    const [behaviour, setBehaviour] = createSignal<IBehaviour>({
        data: {
            timeline: [],
            positive_reasons: {},
            negative_reasons: {},
            other_positive: [],
            other_negative: [],
            other_positive_count: [],
            other_negative_count: [],
        },
        meta: {
            start_date: "",
            end_date: "",
            step_size: "",
        }
    });
    createEffect(async () => {
        const res = await authFetch(account().name, "https://www.classcharts.com/apiv2student/behaviour/");
        if (!res?.data?.timeline) return;
        setBehaviour(res);
    });
    return (
        <section>
            <h2>Behaviour</h2>
            <p>Positive: {behaviour().data?.timeline?.filter((x) => x.positive).length}</p>
            <p>Negative: {behaviour().data?.timeline?.filter((x) => !x.positive).length}</p>
        </section>
    )
}