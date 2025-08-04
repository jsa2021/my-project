import * as SQLite from 'expo-sqlite';

let db = null;


export async function initDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('projects.db');
  }
  return db;
}

///SESSION///


export async function initSessionTable() {
  const db = await initDB();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      localId TEXT,
      email TEXT
    );
  `);
}


export async function saveSession(localId, email) {
  const db = await initDB();
  await db.withTransactionAsync(async () => {
    await db.execAsync(`DELETE FROM session;`);
    await db.runAsync(
      `INSERT INTO session (localId, email) VALUES (?, ?);`,
      [localId, email]
    );
  });
}


export async function clearSession() {
  const db = await initDB();
  await db.runAsync(`DELETE FROM session;`);
}


export async function getSession() {
  const db = await initDB();
  return db.getFirstAsync(`SELECT * FROM session LIMIT 1;`);
}


export async function initEventsTableDB() {
  const db = await initDB();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      pacienteId TEXT,
      pacienteNombre TEXT,
      tipo TEXT,
      start TEXT,
      end TEXT,
      estado TEXT,
      email TEXT
    );
  `);
}

///EVENTS///

export async function saveEventDB(evt) {
  const db = await initDB();
  let insertResult;
  await db.withTransactionAsync(async () => {
    insertResult = await db.runAsync(
      `INSERT INTO events
         (id, pacienteId, pacienteNombre, tipo, start, end, estado, email)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        evt.id,
        evt.pacienteId,
        evt.pacienteNombre,
        evt.tipo,
        evt.start,
        evt.end,
        evt.estado,
        evt.email
      ]
    );
  });
  return insertResult.lastInsertRowId;
}


export async function updateEventDB(evt) {
  const db = await initDB();
  let updateResult;

  await db.withTransactionAsync(async () => {
    updateResult = await db.runAsync(
      `UPDATE events
         SET pacienteId     = ?,
             pacienteNombre = ?,
             tipo           = ?,
             start          = ?,
             end            = ?,
             estado         = ?
       WHERE id = ?;`,
      [
        evt.pacienteId,
        evt.pacienteNombre,
        evt.tipo,
        evt.start,
        evt.end,
        evt.estado,
        evt.id
      ]
    );
  });


  return updateResult.rowsAffected;
}


export async function getEventsByEmailDB(email) {
  const db = await initDB();
  return db.getAllAsync(
    `SELECT * FROM events WHERE email = ? ORDER BY start ASC;`,
    [email]
  );
}

export async function deleteEventDB(id) {
  const db = await initDB();
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `DELETE FROM events WHERE id = ?;`,
      [id]
    );
  });
}



export async function printAllEvents() {
  const db = await initDB();
  for await (const row of db.getEachAsync(`SELECT * FROM events;`)) {
    console.log(row);
  }
}
