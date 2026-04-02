import { Injectable } from "@nestjs/common";

@Injectable()
export class ExecutiveService {
  getMandate() {
    return {
      title: "Executive Mandate",
      content: "The Executive Department is responsible for the overall administration and implementation of policies and programs in Talibon.",
    };
  }

  getVisionMission() {
    return {
      vision: "A premier coastal municipality in Bohol with a globally competitive economy and a resilient community.",
      mission: "To provide efficient and effective public services through sustainable development and participative governance.",
    };
  }

  getChart() {
    return {
      title: "Organizational Chart",
      structure: [
        { role: "Mayor", name: "Hon. Januaria P. Garcia" },
        { role: "Vice Mayor", name: "Hon. Cleto B. Garcia" },
      ],
    };
  }

  getDirectory() {
    return [
      { department: "Mayor's Office", contact: "038-123-4567" },
      { department: "Treasurer's Office", contact: "038-123-4568" },
    ];
  }

  getGadIms() {
    return {
      title: "Talibon GAD-IMS",
      content: "Gender and Development Information Management System (GAD-IMS) for Talibon.",
    };
  }
}
