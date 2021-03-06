import { integer, relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Order = list({
  ui: {
    hideCreate: true,
    hideDelete: true,
    itemView: {
      defaultFieldMode: "read",
    },
  },
  fields: {
    totalPrice: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    shippingAddress: relationship({
      ref: "Address",
    }),
    billingAddress: relationship({
      ref: "Address",
    }),
    user: relationship({ ref: "User.orders" }),
  },
});
