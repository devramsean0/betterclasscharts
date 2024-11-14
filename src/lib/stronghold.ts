import { appDataDir } from '@tauri-apps/api/path';
import { Client, Stronghold } from '@tauri-apps/plugin-stronghold';

export async function initStronghold() {
    const stronghold = await Stronghold.load(`${await appDataDir()}/vault.hold`, "BetterClasscharts");
    let client: Client;
    try {
        client = await stronghold.loadClient("betterClasscharts");
    } catch {
        client = await stronghold.createClient("betterClasscharts");
    }
    return {
        stronghold,
        client
    }
}

export async function insertRecord(store: any, key: string, value: string) {
    const data = Array.from(new TextEncoder().encode(value));
    await store.insert(key, data)
}

export async function getRecord(store: any, key: string): Promise<string> {
    const data = await store.get(key);
    return new TextDecoder().decode(new Uint8Array(data));
}