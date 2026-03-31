import { Controller, Get } from "@nestjs/common";

@Controller("api/about")
export class AboutController {
  @Get("profile")
  getProfile() {
    return {
      title: "Brief Profile",
      content: "Talibon is a first-class municipality in the province of Bohol, Philippines. It is the seat of the Diocese of Talibon and is known as the 'Seafood Capital of Bohol'.",
    };
  }

  @Get("seal")
  getSeal() {
    return {
      title: "Official Seal",
      description: "The official seal of Talibon represents its rich maritime heritage and its status as a key coastal municipality.",
    };
  }

  @Get("history")
  getHistory() {
    return {
      title: "Brief History",
      content: "Talibon was established in 1830. It has a rich history tied to the sea and the legacy of its people, including the late President Carlos P. Garcia.",
    };
  }

  @Get("mayors")
  getMayors() {
    return [
      { name: "Carlos P. Garcia", term: "1925-1931" },
      { name: "Current Mayor", term: "2022-Present" },
    ];
  }

  @Get("barangays")
  getBarangays() {
    return [
      "Bagacay", "Balintawak", "Burgos", "Caboy", "Calituban", "Cataban", "Guindacpan", "Magsaysay", "Poblacion", "San Agustin", "San Francisco", "San Jose", "San Roque", "Santo Niño", "Tanghaligue", "Tapal", "Trinidad", "Zamora"
    ];
  }
}
