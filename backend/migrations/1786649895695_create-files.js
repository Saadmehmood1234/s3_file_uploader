export const up = (pgm) => {
  pgm.createTable("files", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    owner_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },

    original_name: {
      type: "varchar(255)",
      notNull: true,
    },

    storage_key: {
      type: "text",
      notNull: true,
      unique: true,
    },

    mime_type: {
      type: "varchar(150)",
    },

    size: {
      type: "bigint",
      notNull: true,
    },

    visibility: {
      type: "varchar(10)",
      notNull: true,
      default: "private",
      check: "visibility IN ('public', 'private')",
    },

    favorite: {
      type: "boolean",
      notNull: true,
      default: false,
    },

    status: {
      type: "varchar(20)",
      notNull: true,
      default: "pending",
      check: "status IN ('pending', 'uploaded', 'failed')",
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

  pgm.createIndex("files", "owner_id", {
    name: "idx_files_owner",
  });

  pgm.createIndex("files", ["owner_id", "favorite"], {
    name: "idx_files_owner_favorite",
  });

  pgm.createIndex("files", ["owner_id", "visibility"], {
    name: "idx_files_owner_visibility",
  });
};

export const down = (pgm) => {
  pgm.dropTable("files");
};