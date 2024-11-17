import { getRecord, initStronghold, insertRecord } from "./stronghold";
import { fetch } from "@tauri-apps/plugin-http";
import { IBehaviour, IBehaviourError, IStudentLogin } from "../types/classcharts";

export async function authFetch(accountName: string, url: string, options: any = {}) {
    // Initialise connections to associated databases
    const stronghold = await initStronghold();
    const strongholdClient = stronghold.client.getStore();

    // Retireve auth token from stronghold
    console.log("Account Name", accountName)
    const auth = await getRecord(strongholdClient, `${accountName}-auth`);
    console.log("Auth Token", auth)
    if (!auth) {
        throw new Error("No auth token found for this account");
    }
    options.headers.Authorization = `Basic ${auth}`
    const res = await fetch(url, options)
    const resJSON = await res.json() as IBehaviour | IBehaviourError;
    if (res.status === 401) {
        if ((resJSON as IBehaviourError).expired == 1) {
            // If the request is unauthorised, we can assume the auth token is invalid
            await strongholdClient.remove(`${accountName}-auth`);
            const BodyData = new URLSearchParams()
            BodyData.append("_method", "POST")
            BodyData.append("code", await getRecord(strongholdClient, `${accountName}-accessCode`))
            BodyData.append("remember", "true")
            BodyData.append("recaptcha-token", "no-token-available")
            BodyData.append("dob", await getRecord(strongholdClient, `${accountName}-dob`))
            const res = await fetch(`https://www.classcharts.com/apiv2student/login`, {
                method: "POST",
                body: BodyData
            })
            const resJSON = await res.json() as IStudentLogin;
            if (resJSON.success == 1) {
                // Save the session ID in the encrypted store
                await insertRecord(strongholdClient, `${accountName}-auth`, resJSON.success == 1 ? String(resJSON.meta?.session_id) : "")
                return await authFetch(accountName, url, options);         }
        }
    } else {
        return resJSON;
    }
}