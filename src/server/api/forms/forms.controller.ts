import { Controller, Get } from "@nestjs/common";

@Controller("api/forms")
export class FormsController {
  @Get("downloadable")
  getDownloadable() {
    return [
      { id: 1, title: "Business Permit Application", url: "/forms/business-permit.pdf" },
      { id: 2, title: "Building Permit Application Form", url: "/forms/building-permit.pdf" },
      { id: 3, title: "Zoning Certifications/Clearance", url: "/forms/zoning-clearance.pdf" },
    ];
  }
}
