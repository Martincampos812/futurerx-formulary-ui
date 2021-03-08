export const searchOptions = () => {
    return [
        {
            id: '1',
            title: 'Diclofenac',
            type: 'tablets',
            capacity: '75 mg',
            results: [
                {
                    pharmacy: 'Acme Rx',
                    bestPrice: '$3.99',
                    tag: 'discount'
                },
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$3.99',
                    tag: 'match',
                    highlight: true
                },
                {
                    pharmacy: 'Care Pharm',
                    bestPrice: '$6.00',
                    tag: 'copay'
                },
                {
                    pharmacy: 'Wal Mart',
                    bestPrice: '$6.00',
                    tag: 'program'
                },
                {
                    pharmacy: 'Publix',
                    bestPrice: '$6.00',
                    tag: 'copay'
                }
            ]
        },
        {
            id: '2',
            title: 'Lisinopril',
            genericAvailable: true,
            type: 'tablets',
            capacity: '5 mg',
            results: [
                {
                    pharmacy: 'Wal Mart',
                    bestPrice: '$12.00',
                    tag: 'discount'
                },
                {
                    pharmacy: 'Sav-On',
                    bestPrice: '$13.50',
                    tag: 'match'
                },
                {
                    pharmacy: 'Health Mart',
                    bestPrice: '$14.00',
                    tag: 'copay'
                },
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$14.80',
                    tag: 'program', highlight: true
                },
                {
                    pharmacy: 'CVS',
                    bestPrice: '$20.00',
                    tag: 'copay'
                }
            ]
        },
        {
            id: '3',
            title: 'Gileyna',
            capacity: '5 mg',
            type: 'tablets',
            results: [
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$50.00',
                    tag: 'discount',
                    highlight: true
                },
                {
                    pharmacy: 'Leader Drugs',
                    bestPrice: '$50.00',
                    tag: 'match'
                },
                {
                    pharmacy: 'Good Neighbor',
                    bestPrice: '$50.00',
                    tag: 'copay'
                },
                {
                    pharmacy: 'discount Drug Mart Massachusetts',
                    bestPrice: '$50.00',
                    tag: 'program'
                },
                {
                    pharmacy: 'Mail Order Pharmacy',
                    bestPrice: '$98.00',
                    tag: 'copay'
                }
            ]
        },
        {
            title: 'Voltaren',
            type: 'tablets',
            id: '4',
            capacity: '75 mg',
            results: [
                {
                    pharmacy: 'Acme Rx',
                    bestPrice: '$3.99',
                    tag: 'discount',
                    coordinates: { lat: 27.964214, lng: -82.452453 }
                },
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$3.99',
                    tag: 'match', highlight: true,
                    coordinates: { lat: 27.964157, lng: - 82.452606 }
                },
                {
                    pharmacy: 'Care Pharm',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964034, lng: - 82.452467 }
                },
                {
                    pharmacy: 'Wal Mart',
                    bestPrice: '$6.00',
                    tag: 'program',
                    coordinates: { lat: 27.963709, lng: - 82.451898 }
                },
                {
                    pharmacy: 'Publix',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964705, lng: -82.452576 }
                }
            ]
        },
        {
            title: 'Voltaren',
            type: 'tabets',
            capacity: '100 mg',
            id: '5',
            results: [
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$50.00',
                    tag: 'discount', highlight: true,
                    coordinates: { lat: 27.964214, lng: -82.452453 }
                },
                {
                    pharmacy: 'Leader Drugs',
                    bestPrice: '$50.00',
                    tag: 'match',
                    coordinates: { lat: 27.964157, lng: - 82.452606 }
                },
                {
                    pharmacy: 'Good Neighbor',
                    bestPrice: '$50.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964034, lng: - 82.452467 }
                },
                {
                    pharmacy: 'discount Drug Mart Massachusetts',
                    bestPrice: '$50.00',
                    tag: 'program',
                    coordinates: { lat: 27.963709, lng: - 82.451898 }
                },
                {
                    pharmacy: 'Mail Order Pharmacy',
                    bestPrice: '$98.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964705, lng: -82.452576 }
                }
            ]
        },
        {
            title: 'Voltaren',
            type: 'tablets',
            id: '6',
            capacity: '125 mg',
            results: [
                {
                    pharmacy: 'Acme Rx',
                    bestPrice: '$3.99',
                    tag: 'discount',
                    coordinates: { lat: 27.964214, lng: -82.452453 }
                },
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$3.99',
                    tag: 'match', highlight: true,
                    coordinates: { lat: 27.964157, lng: - 82.452606 }
                },
                {
                    pharmacy: 'Care Pharm',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964034, lng: - 82.452467 }
                },
                {
                    pharmacy: 'Wal Mart',
                    bestPrice: '$6.00',
                    tag: 'program',
                    coordinates: { lat: 27.963709, lng: - 82.451898 }
                },
                {
                    pharmacy: 'Publix',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964705, lng: -82.452576 }
                }
            ]
        },
        {
            title: 'Voltaren',
            capacity: '5 mg',
            type: 'gel',
            id: '7',
            results: [
                {
                    pharmacy: 'Acme Rx',
                    bestPrice: '$3.99',
                    tag: 'discount',
                    coordinates: { lat: 27.964214, lng: -82.452453 }
                },
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$3.99',
                    tag: 'match', highlight: true,
                    coordinates: { lat: 27.964157, lng: - 82.452606 }
                },
                {
                    pharmacy: 'Care Pharm',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964034, lng: - 82.452467 }
                },
                {
                    pharmacy: 'Wal Mart',
                    bestPrice: '$6.00',
                    tag: 'program',
                    coordinates: { lat: 27.963709, lng: - 82.451898 }
                },
                {
                    pharmacy: 'Publix',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964705, lng: -82.452576 }
                }
            ]
        },
        {
            title: 'Voltaren',
            capacity: '5 ml',
            type: 'liquid',
            id: '8',
            results: [
                {
                    pharmacy: 'Acme Rx',
                    bestPrice: '$3.99',
                    tag: 'discount',
                    coordinates: { lat: 27.964214, lng: -82.452453 }
                },
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$3.99',
                    tag: 'match', highlight: true,
                    coordinates: { lat: 27.964157, lng: - 82.452606 }
                },
                {
                    pharmacy: 'Care Pharm',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964034, lng: - 82.452467 }
                },
                {
                    pharmacy: 'Wal Mart',
                    bestPrice: '$6.00',
                    tag: 'program',
                    coordinates: { lat: 27.963709, lng: - 82.451898 }
                },
                {
                    pharmacy: 'Publix',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964705, lng: -82.452576 }
                }
            ]
        },
        {
            title: 'Voltaren',
            capacity: '10 ml',
            type: 'liquid',
            id: '9',
            results: [
                {
                    pharmacy: 'Acme Rx',
                    bestPrice: '$3.99',
                    tag: 'discount',
                    coordinates: { lat: 27.964214, lng: -82.452453 }
                },
                {
                    pharmacy: 'Best Drugs Store',
                    bestPrice: '$3.99',
                    tag: 'match', highlight: true,
                    coordinates: { lat: 27.964157, lng: - 82.452606 }
                },
                {
                    pharmacy: 'Care Pharm',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964034, lng: - 82.452467 }
                },
                {
                    pharmacy: 'Wal Mart',
                    bestPrice: '$6.00',
                    tag: 'program',
                    coordinates: { lat: 27.963709, lng: - 82.451898 }
                },
                {
                    pharmacy: 'Publix',
                    bestPrice: '$6.00',
                    tag: 'copay',
                    coordinates: { lat: 27.964705, lng: -82.452576 }
                }
            ]
        }
    ]
}

const timeData = [{ day: 'Mon', time: '9 AM - 5 PM EST' },
{ day: 'Tue', time: '9 AM - 5 PM EST' },
{ day: 'Wed', time: '9 AM - 5 PM EST' },
{ day: 'Thu', time: '9 AM - 7 PM EST' },
{ day: 'Fri', time: '9 AM - 7 PM EST' },
{ day: 'Sat', time: '9 AM - 12 PM EST' },
{ day: 'Sun', time: 'Closed' }]

export const pharmacyData = () => {
    return [
        {
            pharmacy: 'Wal Mart',
            address: '5357 Southwick Dr. Tampa, FL 33624',
            phone: '(813) 269-2814',
            fax: '(813) 269-2814',
            workingHours: timeData,
            coordinates: { lat: 27.964214, lng: -82.452453 }
        },
        {
            pharmacy: 'Acme Rx',
            address: '5357 Southwick Dr. Tampa, FL 33624',
            phone: '(813) 269-2814',
            fax: '(813) 269-2814',
            workingHours: timeData,
            coordinates: { lat: 27.964157, lng: - 82.452606 }
        },
        {
            pharmacy: 'Best Drugs Store',
            address: '5357 Southwick Dr. Tampa, FL 33624',
            phone: '(813) 269-2814',
            fax: '(813) 269-2814',
            workingHours: timeData,
            coordinates: { lat: 27.964034, lng: - 82.452467 }
        },
        {
            pharmacy: 'Care Pharm',
            address: '5357 Southwick Dr. Tampa, FL 33624',
            phone: '(813) 269-2814',
            fax: '(813) 269-2814',
            workingHours: timeData,
            coordinates: { lat: 27.963709, lng: - 82.451898 }
        },
        {
            pharmacy: 'Sav-On',
            address: '123 Main St. Tampa, FL 33624',
            phone: '(813) 269-1234',
            fax: '(813) 269-1234',
            workingHours: timeData,
            coordinates: { lat: 27.964705, lng: -82.452576 }
        },
        {
            pharmacy: 'Publix',
            address: '123 Main St. Tampa, FL 33624',
            phone: '(813) 269-1234',
            fax: '(813) 269-1234',
            workingHours: timeData,
            coordinates: { lat: 27.964214, lng: -82.452453 }
        },
        {
            pharmacy: 'Health Mart',
            address: '123 Main St. Tampa, FL 33624',
            phone: '(813) 269-1234',
            fax: '(813) 269-1234',
            workingHours: timeData,
            coordinates: { lat: 27.964157, lng: - 82.452606 }
        },
        {
            pharmacy: 'CVS',
            address: '123 Main St. Tampa, FL 33624',
            phone: '(813) 269-1234',
            fax: '(813) 269-1234',
            workingHours: timeData,
            coordinates: { lat: 27.964034, lng: - 82.452467 }
        },
        {
            pharmacy: 'Leader Drugs',
            address: '123 Main St. Tampa, FL 33624',
            phone: '(813) 269-1234',
            fax: '(813) 269-1234',
            workingHours: timeData,
            coordinates: { lat: 27.963709, lng: - 82.451898 }
        },
        {
            pharmacy: 'Good Neighbor',
            address: '123 Main St. Tampa, FL 33624',
            phone: '(813) 269-1234',
            fax: '(813) 269-1234',
            workingHours: timeData,
            coordinates: { lat: 27.964705, lng: -82.452576 }
        },
        {
            pharmacy: 'discount Drug Mart Massachusetts',
            address: '123 Main St. Tampa, FL 33624',
            phone: '(813) 269-1234',
            fax: '(813) 269-1234',
            workingHours: timeData,
            coordinates: { lat: 27.963709, lng: - 82.451898 }
        },
        {
            pharmacy: 'Mail Order Pharmacy',
            address: '123 Main St. Tampa, FL 33624',
            phone: '(813) 269-1234',
            fax: '(813) 269-1234',
            workingHours: timeData,
            coordinates: { lat: 27.964705, lng: -82.452576 }
        }
    ]
}

export const getHoverData = () => {
    return {
        program: "This drug is on pharmacy discount drug program",
        copay: "The copay amount per plan benefits",
        discount: "discounted price available at the pharmacy",
        match: "Pharmacy will match lowest price available"
    }
}
