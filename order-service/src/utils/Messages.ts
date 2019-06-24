/**
 * @namespace Utils
 * @object Messages
 */
export default {
    validation: {
        order_status_dont_exist: "Invalid order status",
        order_data_needs_to_be_provided: "userId, placeId, checkoutSlotId and statusId must be provided",
        id_must_be_number: (id: string) => `${id} must be a number`,
        items_must_be_an_array: `'meals' property must be a non-empty array of items ({ mealId: number, quantity: number })`,
        item_data_needs_to_be_provided: `Item data should contain the following attributes: { mealId: number, quantity: number }`,
    },
    order_not_found: "Order not found"
};
