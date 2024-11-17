import { createContext, useContext, createSignal } from "solid-js";
import { IAccounts } from "../types/db";

const AccountContext = createContext<{
  account: () => IAccounts;
  setAccount: (account: IAccounts) => void;
}>();

export function AccountProvider(props: { children: any }) {
  const [account, setAccount] = createSignal<IAccounts>({
    id: 0,
    name: "",
    classcharts_id: 0,
    first_name: "",
    last_name: "",
    state: 0
  });

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {props.children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used within AccountProvider");
  return context;
}