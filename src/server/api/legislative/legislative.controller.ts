import { Controller, Get } from "@nestjs/common";

@Controller("api/legislative")
export class LegislativeController {
  @Get("mandate")
  getMandate() {
    return {
      title: "Mandate",
      content: "The Legislative Department is responsible for enacting ordinances and resolutions for the good of the municipality.",
    };
  }

  @Get("structure")
  getStructure() {
    return {
      title: "Organizational Structure",
      members: [
        { role: "Vice Mayor", name: "Current Vice Mayor" },
        { role: "Sangguniang Bayan Member", count: 8 },
      ],
    };
  }

  @Get("ordinances")
  getOrdinances() {
    return [
      { id: 1, title: "Ordinance No. 1 - 2024", description: "An ordinance for environmental protection." },
      { id: 2, title: "Ordinance No. 2 - 2024", description: "An ordinance for local business incentives." },
    ];
  }

  @Get("resolutions")
  getResolutions() {
    return [
      { id: 1, title: "Resolution No. 1 - 2024", description: "A resolution for the adoption of the annual budget." },
    ];
  }
}
