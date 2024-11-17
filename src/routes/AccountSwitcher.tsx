import { createEffect, createSignal } from "solid-js";
import { Layout } from "../components/ui/layout";
import { IAccounts } from "../types/db";
import { useAccount } from "../contexts/AccountContext";
import Database from "@tauri-apps/plugin-sql";
import { A, useNavigate } from "@solidjs/router";

export default function AccountSwitcher() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = createSignal<IAccounts[]>([]);
    const { account, setAccount } = useAccount();
    createEffect(async () => {
        const db = await Database.load("sqlite:betterclasscharts.db");
        const accounts = await db.select<IAccounts[]>("SELECT * FROM accounts WHERE state = 1");
        setAccounts(accounts);
    })
    return (
        <Layout title="Account Switcher" switcherEnabled={false} backButton={true}>
            <section class="flex flex-col items-center gap-3">
                {accounts().map((acc) => (
                    <button
                        class={`bg-[#ff8c37] p-2 text-xl rounded-md text-left ${account().id == acc.id ? "border-dotted border-2" : ""}`}
                        onClick={() => {
                            setAccount(acc)
                            navigate("/")
                        }}
                    >
                        <div class="flex flex-col">
                            <h3>{acc.name}</h3>
                            <p>{acc.first_name} {acc.last_name}</p>
                        </div>
                    </button>
                ))}
                <A href="/login" class="">Log In</A>
            </section>
        </Layout>
    );
}
