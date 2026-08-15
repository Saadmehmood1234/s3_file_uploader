export const up = (pgm) => {
  pgm.createExtension("pgcrypto", {
    ifNotExists: true,
  });

  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    name: {
      type: "varchar(100)",
      notNull: true,
    },

    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },

    password_hash: {
      type: "text",
      notNull: true,
    },

    is_verified: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    verification_token_hash: {
      type: "text",
      unique: true,
    },

    verification_token_expires_at: {
      type: "timestamptz",
    },

    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable("users");
};