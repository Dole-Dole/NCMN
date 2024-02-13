import { db } from "../db/database.js";

export async function findById(userID) {
  try {
    const [rows] = await db.execute("SELECT * FROM auth WHERE userID=?", [
      userID,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error in findById:", error);
    throw error; // 에러를 상위 레벨로 전파하여 처리
  }
}

export async function createUser(user) {
  try {
    const { userID, password, userName, birthday, university, phone } = user;
    const [result] = await db.execute(
      "INSERT INTO auth (userID, password, userName, birthday, university, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [userID, password, userName, birthday, university, phone]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error; // 에러를 상위 레벨로 전파하여 처리
  }
}
