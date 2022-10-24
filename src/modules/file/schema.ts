export const fileSchema = {
  _id: { type: "string", format: "uuid" },
  name: { type: "string" },
  unit: { type: "number" },
  category: { type: "string" },
  created_at: { type: "string", format: "date-time" },
  updated_at: { type: "string", format: "date-time" },
};

export const listFilesSchema = {
  summary: "products",
  description: "products",
  response: {
    200: {
      type: "array",
      items: {
        properties: fileSchema,
      },
    },
  },
};

export const deleteFileSchema = {
  summary: "delete product",
  description: "delete product",
  params: {
    type: "object",
    required: ["_id"],
    properties: {
      _id: { type: "string" },
    },
  },
  response: {
    200: {
      type: "boolean",
    },
  },
};
