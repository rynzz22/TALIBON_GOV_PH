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
      vision: "Talibon: The Seafood Capital of Bohol anchoring sustainable tourism, smart urban growth, and digital innovation, empowered by its marine wealth, cultural vibrance, and climate-resilient communities.",
      mission: "To promote inclusive economic development by sustainably managing marine resources, fostering innovation in governance, enhancing urban infrastructure, and empowering communities through education, culture, and enterprise.",
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
