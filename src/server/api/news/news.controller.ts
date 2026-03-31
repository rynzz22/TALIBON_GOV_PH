import { Controller, Get } from "@nestjs/common";

@Controller("api/news")
export class NewsController {
  @Get("articles")
  getArticles() {
    return [
      { id: 1, title: "Talibon Celebrates Seafood Festival", date: "2024-03-15", content: "The annual festival was a success with over 10,000 attendees." },
      { id: 2, title: "New Infrastructure Project Launched", date: "2024-03-20", content: "A new road project connecting the coastal areas was launched." },
    ];
  }

  @Get("advisories")
  getAdvisories() {
    return [
      { id: 1, title: "Water Interruption Advisory", date: "2024-03-25", content: "Scheduled maintenance for water pipes in Poblacion area." },
    ];
  }

  @Get("disaster-preparedness")
  getDisasterPreparedness() {
    return {
      title: "Disaster Preparedness",
      content: "Talibon is committed to the safety of its citizens. Here are the emergency hotlines and evacuation centers.",
    };
  }

  @Get("gallery")
  getGallery() {
    return [
      { id: 1, title: "Talibon Cathedral", url: "https://picsum.photos/seed/cathedral/800/600" },
      { id: 2, title: "Bongan Sandbar", url: "https://picsum.photos/seed/sandbar/800/600" },
    ];
  }
}
