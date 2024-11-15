use migrations::migrations;
use tauri::Manager;

mod migrations;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new()
            .add_migrations("sqlite:betterclasscharts.db", migrations())
            .build())
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            let salt_path = app
                .path()
                .app_local_data_dir()
                .expect("Count not resolve local app path")
                .join("salt.txt");
            app.handle()
                .plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![/* classcharts::classcharts_login */])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
