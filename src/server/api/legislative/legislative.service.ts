import { Injectable } from "@nestjs/common";

@Injectable()
export class LegislativeService {
  getMandate() {
    return {
      title: "Legislative Mandate",
      content: "The Sangguniang Bayan is the legislative body of the municipality, responsible for enacting ordinances and resolutions.",
    };
  }

  getStructure() {
    return {
      title: "Organizational Structure",
      members: [
        { role: "Presiding Officer", name: "Hon. Cleto B. Garcia" },
        { role: "SB Member", name: "Hon. Member 1" },
        { role: "SB Member", name: "Hon. Member 2" },
      ],
    };
  }

  getOrdinances() {
    return [
      { id: "2023-01", title: "Environmental Protection Ordinance", date: "2023-01-15" },
      { id: "2023-02", title: "Traffic Management Code", date: "2023-02-20" },
    ];
  }

  getResolutions() {
    return [
      { id: "RES-2023-01", title: "Resolution for New Public Market", date: "2023-01-10" },
    ];
  }
}
