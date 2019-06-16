import db from "../config/database";
import { Place } from "../entities/place.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { SafeCheckoutSlot, CheckoutSlot } from "../entities/checkoutSlot.entity";
import Messages from "../utils/messages";
import { PlaceService } from "../services/place.service";

/**
 * @namespace Services
 * @class CheckoutSlotService
 */
export class CheckoutSlotService {

    public static async findAll(): Promise<SafeCheckoutSlot[]> {
        const repository = db.getRepository(CheckoutSlot);

        try {
            const slots: CheckoutSlot[] = await repository.find({ relations: ["place"] });
            return slots.map(slot => slot.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByPlace(placeId: number): Promise<SafeCheckoutSlot[] | null> {
        const repository = db.getRepository(CheckoutSlot);

        try {
            const slots: CheckoutSlot[] = await repository.createQueryBuilder("checkout_slot")
                .leftJoinAndSelect("checkout_slot.place", "place")
                .where("place.id = :placeId")
                .setParameters({ 'placeId': placeId })
                .getMany();

            return slots.map(slot => slot.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async createCheckoutSlot(placeId: number, start: Date, end: Date): Promise<SafeCheckoutSlot> {
        const placeRepository = db.getRepository(Place);
        const slotRepository = db.getRepository(CheckoutSlot);

        try {
            const place: Place = await PlaceService.findByIdWithoutSafety(placeId);

            if (!place) {
                throw new ServerError(Messages.place_not_found, ErrorCode.RECORD_NOT_FOUND);
            }

            const newSlot = await slotRepository.save(new CheckoutSlot(start, end, place));
            return newSlot.toSafe();
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }
}
