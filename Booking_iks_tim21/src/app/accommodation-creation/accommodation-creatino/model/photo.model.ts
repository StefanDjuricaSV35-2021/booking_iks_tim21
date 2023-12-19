import { SafeUrl } from "@angular/platform-browser";

export class Photo {
    id:number;
    accommodationId:number;
    file: File;
    url: SafeUrl;
}