import { useNavigate } from "@solidjs/router";
import { Layout } from "../components/ui/layout";
import Database from '@tauri-apps/plugin-sql';
import { createRenderEffect } from "solid-js";
import { IAccounts } from "../types/db";
import { load } from "@tauri-apps/plugin-store";
import { useAccount } from "../contexts/AccountContext";
import { BehaviourInformation } from "../components/ui/information/behaviour";

function Home() {
  const navigate = useNavigate();
  const { account, setAccount } = useAccount();
  // Run code to check if a user has an active account and redirect them to the login page if they don't
  createRenderEffect(async () => {
    const db = await Database.load("sqlite:betterclasscharts.db");
    const results = await db.select<IAccounts[]>("SELECT id FROM accounts WHERE state = 1");
    if (results.length == 0) {
      // If no rows are affected, we can assume no records are set as active
      console.log("No active accounts found, redirecting to login page")
      navigate("/login")
      return;
    }
    // If we have an active account, we can set the account state
    const store = await load("store.json");
    const accountID = await store.get<{ value: number }>("activeAccount");
    console.log("Account ID", accountID);
    if (accountID) {
      const account = await db.select<IAccounts[]>("SELECT * FROM accounts WHERE id = $1", [accountID]);
      console.log("Account ID Set, Found Account", account);
      setAccount(account[0]);
    } else {
      const accounts = await db.select<IAccounts[]>("SELECT id FROM accounts WHERE state = 1");
      console.log("Account ID Not Set, Found Account", accounts);
      setAccount(accounts[0]);
      await store.set("activeAccount", accounts[0].id);
    }
    console.log("Active Account Found", account());
  });
  return (
    <Layout title="Home" switcherEnabled={true} backButton={false}>
      <h1>Hello World</h1>
      <BehaviourInformation />
    </Layout>
  );
}

export default Home;
