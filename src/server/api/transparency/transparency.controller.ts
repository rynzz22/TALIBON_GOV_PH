import { Controller, Get } from "@nestjs/common";

@Controller("api/transparency")
export class TransparencyController {
  @Get("citizen-charter")
  getCitizenCharter() {
    return {
      title: "Citizen Charter",
      content: "The Citizen Charter outlines the services and standards of the municipality of Talibon.",
    };
  }

  @Get("full-disclosure")
  getFullDisclosure() {
    return {
      title: "Full Disclosure Policy",
      content: "The Full Disclosure Policy ensures transparency in all municipal transactions.",
    };
  }

  @Get("infrastructure")
  getInfrastructure() {
    return [
      { id: 1, title: "Coastal Road Project", status: "Ongoing", budget: "P10,000,000" },
      { id: 2, title: "Poblacion Drainage System", status: "Completed", budget: "P5,000,000" },
    ];
  }

  @Get("budget")
  getBudget() {
    return {
      title: "Budget and Finances",
      content: "The annual budget is allocated for various municipal services and projects.",
    };
  }
}
