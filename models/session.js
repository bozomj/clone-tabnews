import database from "infra/database";
import { UnauthorizedError } from "infra/errors";
import crypto from "node:crypto";

const EXPIRATION_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000; // 30 Days

async function findOneValidByToken(sessionToken) {
  const sessionFound = await runSelectQuery(sessionToken);

  return sessionFound;

  async function runSelectQuery(sessionToken) {
    const result = await database.query({
      text: `
        SELECT
          *
        FROM
          sessions
        WHERE
          token = $1
          AND expires_at > NOW()
        LIMIT 
          1
      `,
      values: [sessionToken],
    });

    if (result.rowCount === 0) {
      throw new UnauthorizedError({
        message: "Usuario não possui sessão ativa",
        action: "Verifique se ete usuário está logado e tente novamente.",
      });
    }

    return result.rows[0];
  }
}

async function create(userId) {
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newSesion = await runInsertQuery(token, userId, expiresAt);
  return newSesion;

  async function runInsertQuery(token, userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO
          sessions (token, user_id, expires_at)
        VALUES
          ($1, $2, $3)
        RETURNING
         *
      `,
      values: [token, userId, expiresAt],
    });

    return results.rows[0];
  }
}

async function renew(sessionId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const renewedSessionObject = runUpdateQuery(sessionId, expiresAt);
  return renewedSessionObject;

  async function runUpdateQuery(sessionId, expiresAt) {
    const results = await database.query({
      text: `
      UPDATE
        sessions
      SET
        expires_at = $2,
        updated_at = NOW()
      WHERE
       id = $1
      RETURNING 
        *
      ;`,
      values: [sessionId, expiresAt],
    });

    return results.rows[0];
  }
}

const session = {
  create,
  findOneValidByToken,
  renew,
  EXPIRATION_IN_MILLISECONDS,
};

export default session;
