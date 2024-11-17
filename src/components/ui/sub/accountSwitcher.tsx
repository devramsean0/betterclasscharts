import { IAccounts } from "../../../types/db";
import { Icon } from "../../icon";

export function AccountSwitcher(props: { accounts: IAccounts[] }) {
  return (
    <button onClick={(ctx) => {
        
    }}>
        <Icon icon="down-caret" />
    </button>
  )
};