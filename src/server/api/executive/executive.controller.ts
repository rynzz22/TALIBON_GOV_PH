import { Controller, Get } from "@nestjs/common";

@Controller("api/executive")
export class ExecutiveController {
  @Get("mandate")
  getMandate() {
    return {
      title: "Mandate",
      content: "The Executive Department is responsible for implementing laws and policies for the welfare of the people of Talibon.",
    };
  }

  @Get("vision-mission")
  getVisionMission() {
    return {
      vision: "A vibrant, resilient, and inclusive Talibon that is the center of seafood excellence in Bohol.",
      mission: "To provide efficient and effective governance that promotes sustainable development and social justice.",
    };
  }

  @Get("chart")
  getChart() {
    return {
      title: "Organizational Chart",
      structure: [
        { role: "Mayor", name: "Current Mayor" },
        { role: "Vice Mayor", name: "Current Vice Mayor" },
        { role: "Department Heads", count: 12 },
      ],
    };
  }

  @Get("directory")
  getDirectory() {
    return [
      { department: "Mayor's Office", contact: "0912-345-6789" },
      { department: "Treasurer's Office", contact: "0912-345-6790" },
      { department: "Health Office", contact: "0912-345-6791" },
    ];
  }
}
