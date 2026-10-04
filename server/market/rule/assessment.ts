import { BoroughAssessment, CompanyAssessment, ResidentAssessment } from "../../managed/database";

export type MarketAssessment = ResidentAssessment | CompanyAssessment | BoroughAssessment;
