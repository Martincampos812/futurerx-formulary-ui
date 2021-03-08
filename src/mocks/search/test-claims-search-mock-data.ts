export const getTestClaimsSearchData = () => {
    return [
        {
            id: 1,
            row: 1,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 170,
            placeholder: "Test Claim ID",
            name: "testClaimId",
        },
        {
            id: 2,
            row: 1,
            searchType: "DROPDOWN",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 170,
            placeholder: "Status",
            name: "status",
            options: [{ id: 1, displayOption: 'Paid', item: "Paid" }, { id: 2, displayOption: 'Reversed', item: "Reversed" }, { id: 3, displayOption: 'Rejected', item: "Rejected" }]
        },
        {
            id: 3,
            row: 1,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 170,
            placeholder: "Drug Label",
            name: "drugLabel",
        },
        {
            id: 4,
            row: 1,
            searchType: "DROPDOWN",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 208,
            placeholder: "Test Claim Submisson Type",
            name: "testClaimSubmissionType",
            options: [{ id: 1, displayOption: 'Paid', item: "Paid" }, { id: 2, displayOption: 'Reversed', item: "Reversed" }, { id: 3, displayOption: 'Rejected', item: "Rejected" }]
        },
        {
            id: 5,
            row: 1,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 170,
            placeholder: "DUR History",
            name: "ClaimType"
        },
        {
            id: 6,
            row: 1,
            searchType: "CLEAR",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 54,
            placeholder: "",
            className: "clr-testClaims-btn",
            name: "",
            value: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
        },
        {
            id: 7,
            row: 2,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 170,
            placeholder: "RX #",
            name: "rx",
        },
        {
            id: 8,
            row: 2,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 170,
            placeholder: "Prescriber",
            name: "prescriber"
        },
        {
            id: 9,
            row: 2,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 170,
            placeholder: "Pharmacy",
            name: "pharmacy",
        },
        {
            id: 10,
            row: 2,
            searchType: "DATE",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 110,
            placeholder: "Start date",
            name: "startDate"
        },
        {
            id: 11,
            row: 2,
            searchType: "DATE",
            isRequired: true,
            nameSpace: 'testClaimsGrid',
            pixelWidth: 110,
            placeholder: "End date",
            name: "endDate"
        }
    ]
}