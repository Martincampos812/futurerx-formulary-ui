export const getPharmacySearchFields = () => {
    return [
        {
            id: 1,
            row: 1,
            searchType: 'DROPDOWN',
            isRequired: true,
            nameSpace: 'pharmacyGrid',
            pixelWidth: 170,
            placeholder: "Network Type",
            name: "networkType",
            options: [
                { id: 1, displayOption: 'All', item: "All" },
                { id: 2, displayOption: 'Preferred Network', item: "Preferred Network" }
            ]
        },
        {
            id: 2,
            row: 1,
            searchType: 'TEXT',
            isRequired: true,
            nameSpace: 'pharmacyGrid',
            pixelWidth: 300,
            placeholder: "Pharmacy Name",
            name: "pharmacyName"
        },
        {
            id: 3,
            row: 1,
            searchType: 'DROPDOWN',
            isRequired: true,
            nameSpace: 'pharmacyGrid',
            pixelWidth: 170,
            placeholder: "Pharmacy Type",
            name: "pharmacyType",
            options: [
                { id: 1, displayOption: 'Retail', item: "Retail" },
                { id: 2, displayOption: 'Mail Order', item: "Mail Order" },
                { id: 3, displayOption: 'Specialty', item: "Specialty" },
                { id: 4, displayOption: 'Home Infusion', item: "Home Infusion" },
                { id: 5, displayOption: 'LTC', item: "LTC" },
                { id: 6, displayOption: 'I/T/U', item: "I/T/U" },

            ]
        },
        {
            id: 4,
            row: 1,
            searchType: 'CLEAR',
            isRequired: true,
            nameSpace: 'pharmacyGrid',
            pixelWidth: 54,
            placeholder: "",
            className: 'clr-btn-pharmacy',
            value: [1, 2, 3, 5, 6, 7],
            name: ""
        },
        {
            id: 5,
            row: 2,
            searchType: 'TEXT',
            isRequired: true,
            nameSpace: 'pharmacyGrid',
            pixelWidth: 170,
            placeholder: "City",
            name: "city",
        },
        {
            id: 6,
            row: 2,
            searchType: 'DROPDOWN',
            isRequired: true,
            nameSpace: 'pharmacyGrid',
            pixelWidth: 170,
            placeholder: "State",
            name: "state",
            smallDropDown: true,
            options: [
                {
                  "id": 1,
                  "displayOption": "AK",
                  "item": "AK"
                },
                {
                  "id": 2,
                  "displayOption": "AL",
                  "item": "AL"
                },
                {
                  "id": 3,
                  "displayOption": "AR",
                  "item": "AR"
                },
                {
                  "id": 4,
                  "displayOption": "AZ",
                  "item": "AZ"
                },
                {
                  "id": 5,
                  "displayOption": "CA",
                  "item": "CA"
                },
                {
                  "id": 6,
                  "displayOption": "CO",
                  "item": "CO"
                },
                {
                  "id": 7,
                  "displayOption": "CT",
                  "item": "CT"
                },
                {
                  "id": 8,
                  "displayOption": "DE",
                  "item": "DE"
                },
                {
                  "id": 9,
                  "displayOption": "FL",
                  "item": "FL"
                },
                {
                  "id": 10,
                  "displayOption": "GA",
                  "item": "GA"
                },
                {
                  "id": 11,
                  "displayOption": "HI",
                  "item": "HI"
                },
                {
                  "id": 12,
                  "displayOption": "IA",
                  "item": "IA"
                },
                {
                  "id": 13,
                  "displayOption": "ID",
                  "item": "ID"
                },
                {
                  "id": 14,
                  "displayOption": "IL",
                  "item": "IL"
                },
                {
                  "id": 15,
                  "displayOption": "IN",
                  "item": "IN"
                },
                {
                  "id": 16,
                  "displayOption": "KS",
                  "item": "KS"
                },
                {
                  "id": 17,
                  "displayOption": "KY",
                  "item": "KY"
                },
                {
                  "id": 18,
                  "displayOption": "LA",
                  "item": "LA"
                },
                {
                  "id": 19,
                  "displayOption": "MA",
                  "item": "MA"
                },
                {
                  "id": 20,
                  "displayOption": "MD",
                  "item": "MD"
                },
                {
                  "id": 21,
                  "displayOption": "ME",
                  "item": "ME"
                },
                {
                  "id": 22,
                  "displayOption": "MI",
                  "item": "MI"
                },
                {
                  "id": 23,
                  "displayOption": "MN",
                  "item": "MN"
                },
                {
                  "id": 24,
                  "displayOption": "MO",
                  "item": "MO"
                },
                {
                  "id": 25,
                  "displayOption": "MS",
                  "item": "MS"
                },
                {
                  "id": 26,
                  "displayOption": "MT",
                  "item": "MT"
                },
                {
                  "id": 27,
                  "displayOption": "NC",
                  "item": "NC"
                },
                {
                  "id": 38,
                  "displayOption": "ND",
                  "item": "ND"
                },
                {
                  "id": 29,
                  "displayOption": "NE",
                  "item": "NE"
                },
                {
                  "id": 30,
                  "displayOption": "NH",
                  "item": "NH"
                },
                {
                  "id": 31,
                  "displayOption": "NJ",
                  "item": "NJ"
                },
                {
                  "id": 32,
                  "displayOption": "NM",
                  "item": "NM"
                },
                {
                  "id": 33,
                  "displayOption": "NV",
                  "item": "NV"
                },
                {
                  "id": 34,
                  "displayOption": "NY",
                  "item": "NY"
                },
                {
                  "id": 35,
                  "displayOption": "OH",
                  "item": "OH"
                },
                {
                  "id": 36,
                  "displayOption": "OK",
                  "item": "OK"
                },
                {
                  "id": 37,
                  "displayOption": "OR",
                  "item": "OR"
                },
                {
                  "id": 38,
                  "displayOption": "PA",
                  "item": "PA"
                },
                {
                  "id": 39,
                  "displayOption": "RI",
                  "item": "RI"
                },
                {
                  "id": 40,
                  "displayOption": "SC",
                  "item": "SC"
                },
                {
                  "id": 41,
                  "displayOption": "SD",
                  "item": "SD"
                },
                {
                  "id": 42,
                  "displayOption": "TN",
                  "item": "TN"
                },
                {
                  "id": 43,
                  "displayOption": "TX",
                  "item": "TX"
                },
                {
                  "id": 44,
                  "displayOption": "UT",
                  "item": "UT"
                },
                {
                  "id": 45,
                  "displayOption": "VA",
                  "item": "VA"
                },
                {
                  "id": 46,
                  "displayOption": "VT",
                  "item": "VT"
                },
                {
                  "id": 47,
                  "displayOption": "WA",
                  "item": "WA"
                },
                {
                  "id": 48,
                  "displayOption": "WI",
                  "item": "WI"
                },
                {
                  "id": 49,
                  "displayOption": "WV",
                  "item": "WV"
                },
                {
                  "id": 50,
                  "displayOption": "WY",
                  "item": "WY"
                }
              ]
        },
        {
            id: 7,
            row: 2,
            searchType: 'TEXT',
            isRequired: true,
            nameSpace: 'pharmacyGrid',
            pixelWidth: 170,
            placeholder: "Zip",
            name: "zip"
        }
    ]
}
