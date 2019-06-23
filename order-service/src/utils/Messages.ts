/**
 * @namespace Utils
 * @object Messages
 */
export default {
    validation: {
        order_status_dont_exist: "Order status don't exist",
        order_data_needs_to_be_provided: "userId, placeId, checkoutSlotId and statusId must be provided",
        id_must_be_number: (id: string) => `${id} must be a number`
    }
};
