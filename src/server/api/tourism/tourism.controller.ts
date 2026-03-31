import { Controller, Get } from "@nestjs/common";

@Controller("api/tourism")
export class TourismController {
  @Get("spots")
  getSpots() {
    return [
      { id: 1, name: "Talibon Cathedral", description: "A historic and beautiful cathedral in the heart of the municipality." },
      { id: 2, name: "Bongan Sandbar", description: "A white sandbar that appears during low tide, perfect for swimming and relaxation." },
    ];
  }

  @Get("festivities")
  getFestivities() {
    return [
      { id: 1, name: "Talibon Strings of Fiesta", date: "May 1", description: "A celebration of music and culture." },
      { id: 2, name: "Foundation Day and Town Fiesta", date: "May 20", description: "The anniversary of the municipality's foundation." },
      { id: 3, name: "Abundayon Festival", date: "May 25", description: "A harvest festival celebrating the bounty of the sea." },
    ];
  }

  @Get("delicacies")
  getDelicacies() {
    return [
      { id: 1, name: "Tatak Talibon Products", description: "Local delicacies and items produced in Talibon." },
    ];
  }
}
