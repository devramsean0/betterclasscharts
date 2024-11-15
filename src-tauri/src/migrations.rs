use tauri_plugin_sql::{Migration, MigrationKind};

pub fn migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_initial_accounts_table",
            kind: MigrationKind::Up,
            sql:"CREATE TABLE accounts (id INTEGER PRIMARY KEY, name TEXT, classcharts_id INTEGER, first_name TEXT, last_name TEXT);"
        }
    ]
}