import connection from "../config/database.js";
import mapObjectToUpdateQuery from '../utils/sqlUtils.js';

export interface Fighter {
    id: number,
	username: string,
	wins: number,
	losses: number,
	draws: number
}

export type FighterUpdateData = Partial<Fighter>;

export async function findByUsername(username: string)  {
    const result = await connection.query<Fighter, [string]>("SELECT * FROM fighters WHERE username = $1", [username])

    return result.rows[0]
}

export async function fetchRanking()  {
    const result = await connection.query("SELECT * FROM fighters ORDER BY wins DESC, draws DESC, draws", [])

    return result.rows
}

export async function insert(username: string)  {
    const result = await connection.query<Fighter, [string]>("INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, 0, 0, 0) RETURNING *", [username])

	return result.rows[0]
}

export async function update(username: string, fighterData: FighterUpdateData) {
    const { objectColumns: fighterColumns, objectValues: fighterValues } = mapObjectToUpdateQuery({
        object: fighterData,
        offset: 2,
    });

    await connection.query(
        `
    UPDATE fighters
      SET ${fighterColumns}
    WHERE username = $1
  `,
        [username, ...fighterValues]
    );
}