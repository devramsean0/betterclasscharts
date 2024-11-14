import "./App.css";
import { Layout } from "./components/ui/layout";
import { insertRecord, initStronghold, getRecord } from "./lib/stronghold";

function App() {
  (async () => {
    const store = await initStronghold();
    await insertRecord(store.client.getStore(), "test", "test")
    console.log(await getRecord(store.client.getStore(), "test"));
  })();
  return (
    <Layout>
      <h1>Hello World</h1>
    </Layout>
  );
}

export default App;
