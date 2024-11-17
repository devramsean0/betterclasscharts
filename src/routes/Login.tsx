import { fetch } from "@tauri-apps/plugin-http";
import { Input, SubmitButton } from "../components/form";
import { Layout } from "../components/ui/layout";
import { getRecord, initStronghold, insertRecord, } from "../lib/stronghold";
import Database from "@tauri-apps/plugin-sql";
import { IStudentLogin } from "../types/classcharts";
import { useNavigate } from "@solidjs/router";
import { load } from "@tauri-apps/plugin-store";

function Login() {
    const navigate = useNavigate();
    return (
        <Layout title="Login" switcherEnabled={false} backButton={false}>
            <form class="flex flex-col items-center justify-center" action="" onSubmit={async (ctx) => {
                ctx.preventDefault();
                // Initialise Datastore connections
                const stronghold = await initStronghold();
                const strongholdClient = stronghold.client.getStore();
                const db = await Database.load("sqlite:betterclasscharts.db");
                const store = await load("store.json");
                const accountName = (document.getElementById("account-name") as HTMLInputElement).value
                await insertRecord(strongholdClient, `${accountName}-accessCode`, (document.getElementById("access-code") as HTMLInputElement).value)
                await insertRecord(strongholdClient, `${accountName}-dob`, (document.getElementById("dob") as HTMLInputElement).value)
                console.log((document.getElementById("access-code") as HTMLInputElement).value)
                console.log("Saved Elements")

                // Make a connection to the classcharts API
                const BodyData = new URLSearchParams()
                BodyData.append("_method", "POST")
                BodyData.append("code", (document.getElementById("access-code") as HTMLInputElement).value)
                BodyData.append("remember", "true")
                BodyData.append("recaptcha-token", "no-token-available")
                BodyData.append("dob", (document.getElementById("dob") as HTMLInputElement).value)
                const res = await fetch(`https://www.classcharts.com/apiv2student/login`, {
                    method: "POST",
                    body: BodyData
                })
                const resJSON = await res.json() as IStudentLogin;
                if (resJSON.success == 1) {
                    // Save the session ID in the encrypted store
                    await insertRecord(strongholdClient, `${accountName}-auth`, String(resJSON.meta?.session_id))
                    console.log(`${accountName} Login Successfull`, await getRecord(strongholdClient, `${accountName}-auth`))
                    // Create record in the DB
                    const dbResult = await db.execute("INSERT INTO accounts (name, classcharts_id, first_name, last_name, state) VALUES ($1, $2, $3, $4, $5)",
                        [accountName, Number(resJSON.data?.id), String(resJSON.data?.first_name), String(resJSON.data?.last_name), 1]
                    )
                    console.log("Saved in DB")
                    // We assume the new account is the active account
                    store.set("activeAccount", dbResult.lastInsertId)
                } else {
                    console.log("Login Unsuccessfull", resJSON.error)
                }
                navigate("/")
            }}>
                <Input id="account-name" label="Account Name" required/>
                <Input id="access-code" label="Access Code" required password />
                <Input id="dob" label="Date of Birth" required />
                <SubmitButton />
            </form>
        </Layout>
    )
}

export default Login;