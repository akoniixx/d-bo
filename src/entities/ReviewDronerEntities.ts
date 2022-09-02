
export interface reviewDronerDetail {
    avg: number;
    taskId: string;
    comment: string;
    canReview: string;
    punctuality: string;
    pilotEtiquette: string;
    sprayExpertise: string;
}
export const reviewDronerDetail_INIT : reviewDronerDetail = {
    avg: 0,
    taskId: "",
    comment: "",
    canReview: "",
    punctuality: "",
    pilotEtiquette: "",
    sprayExpertise: "",
}