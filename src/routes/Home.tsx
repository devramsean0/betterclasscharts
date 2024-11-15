import { A } from "@solidjs/router";
import { Layout } from "../components/ui/layout";
import { insertRecord, initStronghold, getRecord } from "../lib/stronghold";

function Home() {
  (async () => {
    const store = await initStronghold();
    await insertRecord(store.client.getStore(), "test", "test")
    console.log(await getRecord(store.client.getStore(), "test"));
  })();
  return (
    <Layout title="Home" switcherEnabled={true}>
      <A href="/login">Login</A>
      <h1>Hello World</h1>
    </Layout>
  );
}

export default Home;
