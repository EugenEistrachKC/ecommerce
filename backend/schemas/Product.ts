import { integer, relationship, select, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Product = list({
  fields: {
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Published", value: "PUBLISHED" },
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" },
      },
    }),
    code: text({ isRequired: true, isUnique: true }),
    name: text({ isRequired: true }),
    price: integer({ isRequired: true }),
    description: text({ ui: { displayMode: "textarea" } }),
    images: relationship({
      ref: "CloudImage.products",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "name"],
        inlineCreate: { fields: ["image", "name"] },
        inlineEdit: { fields: ["image", "name"] },
      },
      many: true,
    }),
    categories: relationship({
      ref: "Category.products",
      many: true,
    }),
    user: relationship({
      ref: "User.products",
      label: "Created By",
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
      ui: {
        itemView: {
          fieldMode: "read",
        },
        createView: {
          fieldMode: "hidden",
        },
      },
    }),
  },
});
