import { Controller, Get, Inject } from "@nestjs/common";
import { FormsService } from "./forms.service";

@Controller("api/forms")
export class FormsController {
  constructor(@Inject(FormsService) private readonly formsService: FormsService) {}

  @Get("downloadable")
  getDownloadable() {
    return this.formsService.getDownloadable();
  }

  @Get("business-permits")
  getBusinessPermits() {
    return this.formsService.getBusinessPermits();
  }

  @Get("building-permits")
  getBuildingPermits() {
    return this.formsService.getBuildingPermits();
  }

  @Get("zoning-clearance")
  getZoningClearance() {
    return this.formsService.getZoningClearance();
  }
}
