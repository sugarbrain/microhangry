/**
 * @namespace Utils
 * @object Messages
 */
export default {
    validation: {
        username_exists: "Username already exists",
        username_length: "Username must have a length between 3 and 20",
        email_exists: "Email already in use",
        email_not_valid: "Email not valid",
        data_needs_to_be_provided: "Data must be provided according to its requirements",
        permisson_exists: "Permisson already exists",
        permisson_length: "Permisson must have a length between 3 and 20",
        place_category_length: "Place category name must have a length between 3 and 64",
        place_category_exists: "Place category already exists",
        place_category_does_not_exist: "Place category does not exist",
        place_does_not_exist: "Meal does not exist",
        place_name_length: "Place name must have a length between 3 and 64",
        place_address_length: "Place address must have a length between 3 and 64",
        place_phone_length: "Place phone must have a length of 12",
        place_description_length: "Place description must have a length between 3 and 255",
        place_data_needs_to_be_provided: "Name, category_id, address, phone and description must be provided",
        meal_name_length: "Meal name must have a length between 3 and 64",
        meal_description_length: "Meal description must have a length between 3 and 255",
        access_exists: "Access already exists for this permission",
        ids_should_be_numbers: "Expecting number type parameters",
        checkout_slot_missing_data: "Place id, start date and end date must be provided",
        id_must_be_number: (id: string) => `${id} must be a number`,
    },
    user_not_found: "User not found",
    place_not_found: "Place not found"
};
