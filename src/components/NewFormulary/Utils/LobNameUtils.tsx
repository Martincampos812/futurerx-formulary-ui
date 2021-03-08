export default function getLobName(lobId: any){
    switch(lobId){
        case 1:
            return 'Medicare';
        case 2:
            return 'Medicaid';
        case 3:
            return 'Exchange';
        case 4:
            return 'Commercial';
        default:
            return 'Medicare';
    }
}