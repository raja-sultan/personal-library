export function useDataCheckArray({ checkList }): any[] {
    return [
        {
            id: '1',
            title: 'Required',
            description: 'All eligible and ineligible employees must have a base pay amount, pay effective date, pay type, and currency assigned to be included in the cycle. This data can be updated in the Employee pay table.',
            fields: [
                { id: '01', title: 'Employee pay data', value: `${checkList?.employeePayData}/${checkList?.totalEmployees} assigned`, divider: true },
                { id: '02', title: 'British Pounds (£)', value: `${checkList?.assignedCurrencies} assigned`, divider: false },
            ],
            divider: true,
        },
        {
            id: '2',
            title: 'Optional',
            description: 'In compensation band assignments you can see the list of employees assigned to a specific compensation band. In promotion decisions you will see the list of employees who are receiving promotion in this cycle.',
            fields: [
                { id: '03', title: 'Compensation band assignments', value: `${checkList?.compensationCycleCount}/${checkList?.totalEmployees} assigned`, divider: true },
                { id: '04', title: 'Promotion decisions', value: `${checkList?.promotionDecision} promotion`, divider: false },
            ],
            divider: false,
        },
    ]
}