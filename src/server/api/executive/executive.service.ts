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
      mayor: { name: "HON. JANETTE GARCIA", role: "MUNICIPAL MAYOR" },
      level2: [
        { name: "MR. MANUELITO A. CAROSUS", role: "MUNICIPAL ADMINISTRATOR" },
        { name: "SANGGUNIANG BAYAN OFFICE", role: "LEGISLATIVE BODY" },
      ],
      departments: [
        { name: "MS. FLOR JEMMA P. CAJES", role: "MUNICIPAL ACCOUNTANT" },
        { name: "MS. BERNARDITA V. AUTENTICO", role: "MUNICIPAL TREASURER" },
        { name: "MS. FALCONIRIS A. LUGASIP", role: "MUNICIPAL BUDGET OFFICER" },
        { name: "MS. SARAH JANE R. HENSON", role: "HUMAN RESOURCE MANAGEMENT OFFICER" },
        { name: "ENGR. GERRY V. ARAÑETA", role: "MUNICIPAL PLANNING DEVELOPMENT COORDINATOR" },
        { name: "DR. MARY JECIEL D. CLEMENTE-DOLOR, RMT", role: "MUNICIPAL HEALTH OFFICER" },
        { name: "ENGR. LORENZO R. FLORES", role: "MUNICIPAL ENGINEER" },
        { name: "MR. FELIX D. EVANGELISTA", role: "MARKET SUPERVISOR" },
        { name: "MS. CELESTINA T. PENTACASE", role: "MUNICIPAL CIVIL REGISTRAR" },
        { name: "MS. ELLEN M. ARQUITA-MAGALLANES, RSW", role: "MUNICIPAL SOCIAL WELFARE DEVELOPMENT OFFICER" },
        { name: "MR. ANGELITO A. OROYAN", role: "MUNICIPAL AGRICULTURIST" },
        { name: "MR. ALMER D. POLO", role: "PESO MANAGER" },
        { name: "ENGR. RAMEL A. ARTIAGA", role: "MUNICIPAL ASSESSOR" },
        { name: "MR. CIELITO O. EVANGELISTA", role: "MUNICIPAL ENVIRONMENT NATURAL RESOURCE OFFICER" },
        { name: "MR. VLADIMIR G. AVENIDO", role: "DRRM OFFICER" },
        { name: "MS. RACHEL P. SAYSON", role: "SENIOR TOURISM OFFICER" },
        { name: "MS. JOCELYN A. BARON", role: "INTERNAL AUDITOR" },
        { name: "DR. STANLEY CLARK M. DIPAY", role: "COLLEGE ADMINISTRATOR" },
        { name: "MR. CIELITO O. EVANGELISTA", role: "GENERAL SERVICES OFFICER" },
        { name: "ENGR. FERDINAND Q. ARTIAGA", role: "PARKING INTEGRATION TRANSPORT TERMINAL OFFICER" },
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
