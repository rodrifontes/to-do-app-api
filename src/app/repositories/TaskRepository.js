const db = require('../../database');

class TaskRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT *
      FROM tasks
      ORDER BY create_date ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
      FROM tasks
      WHERE id = $1
    `, [id]);
    return row;
  }

  async create({
    title, description,
  }) {
    const [row] = await db.query(`
      INSERT INTO tasks (title, description)
      VALUES ($1, $2)
      RETURNING *;
    `, [title, description]);

    return row;
  }

  async update(id, {
    title, description,
  }) {
    const [row] = await db.query(`
      UPDATE tasks
      SET title = $1, description = $2
      WHERE id = $3
      RETURNING *;
    `, [title, description, id]);

    return row;
  }

  async updateStatus(id) {
    const [row] = await db.query(`
      UPDATE tasks
      SET done = not done
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM tasks WHERE id = $1;', [id]);
    return deleteOp;
  }
}

module.exports = new TaskRepository();
