import { ReviewDto } from "./review.dto";

export class LocationUpdateDto {
    _id: string;
    address: string;
    campaign: string;
    photos: string[];
    size: string;
    status: string;
    tflow: string;
    title: string;
    reviews: [];
}