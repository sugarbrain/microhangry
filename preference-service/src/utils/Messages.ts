/**
 * @namespace Utils
 * @object Messages
 */
export default {
    validation: {
        preference_data_needs_to_be_provided: "userId, placeCategoryId and checkoutSlotId must be provided",
        id_must_be_number: (id: string) => `${id} must be a number`
    }
};
