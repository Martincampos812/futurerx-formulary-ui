export const getAlertsData = (): any => {
    return [
        {
            id: 1,
            key: 1,
            description: "Member has been diagnosed with hypertension.",
            priority: "Standard",
            effective_date: "10/03/2020",
            term_date: "",
            items: [
                {
                    id: 21,
                    key: 21,
                    title: "Term Record"
                },
                {
                    id: 22,
                    key: 22,
                    title: "Add Note"
                }
            ]
        },
        {
            id: 2,
            key: 2,
            description: "Omeprazole dose increased from 5 to 20 mg.",
            priority: "Standard",
            effective_date: "10/01/2020",
            term_date: "10/02/2020",
            items: [
                {
                    id: 21,
                    key: 21,
                    title: "Term Record"
                },
                {
                    id: 22,
                    key: 22,
                    title: "Add Note"
                }
            ]
        }, {
            id: 3,
            key: 3,
            description: "Member diagnosed with strep throat.",
            priority: "Standard",
            effective_date: "10/03/2020",
            term_date: "09/30/2020",
            hideHighlight: true,
            termNote: "Member is up to date on all vaccinations.",
            items: [
                {
                    id: 21,
                    key: 21,
                    title: "Term Record"
                },
                {
                    id: 22,
                    key: 22,
                    title: "Add Note"
                }
            ]
        },
        {
            id: 4,
            key: 4,
            description: "Omeprazole 5 mg prescribed.",
            priority: "Standard",
            effective_date: "10/01/2020",
            term_date: "10/02/2020",
            termNote: "Omeprazole 5 mg prescribed.",
            items: [
                {
                    id: 21,
                    key: 21,
                    title: "Term Record"
                },
                {
                    id: 22,
                    key: 22,
                    title: "Add Note"
                }
            ]
        }
    ];
};