export class EngagementPlan {
    subject: string;
    group: [
        {
            name: string;
            employees: Array<string>;
        }
    ];
    employees: Array<string>;
}