import { SurveyItem } from './survey-item';

export class SurveyForm {
    formId: number;
    title: string;
    comment: string;
    items: SurveyItem[];
}
