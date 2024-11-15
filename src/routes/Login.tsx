import { fetch } from "@tauri-apps/plugin-http";
import { Input, SubmitButton } from "../components/form";
import { Layout } from "../components/ui/layout";
import { initStronghold, insertRecord, } from "../lib/stronghold";
import Database from "@tauri-apps/plugin-sql";
import { IStudentLogin } from "../types/classcharts";

function Login() {
    return (
        <Layout title="Login" switcherEnabled={false}>
            <form class="flex flex-col items-center justify-center" action="" onSubmit={async (ctx) => {
                ctx.preventDefault();
                // Initialise Datastore connections
                const stronghold = await initStronghold();
                const strongholdClient = stronghold.client.getStore();
                const db = await Database.load("sqlite:betterclasscharts.db");
                const accountName = document.getElementById("account-name")
                await insertRecord(strongholdClient, `${accountName}-accessCode`, (document.getElementById("access-code") as HTMLInputElement).value)
                await insertRecord(strongholdClient, `${accountName}-dob`, (document.getElementById("dob") as HTMLInputElement).value)
                console.log((document.getElementById("access-code") as HTMLInputElement).value)
                console.log("Saved Elements")
                // Make a connection to the classcharts API
                const res = await fetch(`https://www.classcharts.com/apiv2student/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        code: (document.getElementById("access-code") as HTMLInputElement).value,
                        remember: true,
                        "recaptcha-token": "no-token-avaliable",
                        "dob": (document.getElementById("dob") as HTMLInputElement).value
                    })
                })
                const resJSON = await res.json() as IStudentLogin;
                    if (resJSON.success == 1) {
                    // Save the session ID in the encrypted store
                    await insertRecord(strongholdClient, `${accountName}-auth`, resJSON.success == 1 ? String(resJSON.meta?.session_id) : "")
                    // Create record in the DB
                    await db.execute("INSERT INTO accounts (name, classcharts_id, first_name, last_name) VALUES ($1, $2, $3, $4)",
                        [accountName, Number(resJSON.data?.id), String(resJSON.data?.first_name), String(resJSON.data?.last_name)]
                    )
                    console.log("Saved in DB")
                } else {
                    console.log("Login Unsuccessfull", resJSON.error)
                }
            }}>
                <Input id="account-name" label="Account Name" required />
                <Input id="access-code" label="Access Code" required />
                <Input id="dob" label="Date of Birth" required />
                <SubmitButton />
            </form>
        </Layout>
    )
}

export default Login;