const pool = require('../../database/connection')


const createLogsSchema = async () => {
  try {

    await pool.query('BEGIN');

    await pool.query(`
      CREATE TABLE logs (
          id SERIAL,
          date DATE NOT NULL,
          name TEXT,
          total_marks INT,
          PRIMARY KEY(id, date)
      ) PARTITION BY RANGE (date);
    `);

    await pool.query(`
      CREATE TABLE logs_staging (
          id SERIAL,
          date DATE NOT NULL,
          name TEXT,
          total_marks INT
      );
    `);

    await pool.query(`
      CREATE OR REPLACE FUNCTION insert_into_logs_partition()
      RETURNS TRIGGER AS $$
      DECLARE
          partition_start DATE;
          partition_end DATE;
          partition_name TEXT;
          partition_exists BOOLEAN;
          inserted_row logs%ROWTYPE;
      BEGIN
          IF NEW.date < DATE '2025-01-01' OR NEW.date >= DATE '2026-01-01' THEN
              RAISE EXCEPTION 'Date % is out of allowed range (2025 only)', NEW.date;
          END IF;

          partition_start := date_trunc('month', NEW.date)::DATE;
          partition_end := (partition_start + INTERVAL '1 month')::DATE;
          partition_name := format('logs_%s', to_char(partition_start, 'YYYY_MM'));

          SELECT EXISTS (
              SELECT 1 FROM pg_class WHERE relname = partition_name
          ) INTO partition_exists;

          IF NOT partition_exists THEN
              EXECUTE format(
                  'CREATE TABLE IF NOT EXISTS %I PARTITION OF logs
                   FOR VALUES FROM (%L) TO (%L);',
                  partition_name, partition_start, partition_end
              );
          END IF;

          INSERT INTO logs (date, name, total_marks)
          VALUES (NEW.date, NEW.name, NEW.total_marks)
          RETURNING * INTO inserted_row;

          RETURN inserted_row;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await pool.query(`
      CREATE TRIGGER trg_insert_logs_partition
      BEFORE INSERT ON logs_staging
      FOR EACH ROW
      EXECUTE FUNCTION insert_into_logs_partition();
    `);

    await pool.query('COMMIT');
    console.log("logs and trigger schema created successfully");
  } catch (err) {
    await pool.query('ROLLBACK');
    
    if(err.code !== '42P07'){
    console.error("Error setting up schema:", err.message);
    }
  } 
};

createLogsSchema();