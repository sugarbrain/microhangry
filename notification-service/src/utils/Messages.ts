/**
 * @namespace Utils
 * @object Messages
 */
export default {
    validation: {
        notification_message_length: "Notification messsage must have length between 3 and 255",
        notification_data_needs_to_be_provided: "Message and userId must be provided",
        id_must_be_number: (id: string) => `${id} must be a number`
    }
};
