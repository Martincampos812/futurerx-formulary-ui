export default function getMaxTierCount(lobId: any, formularyType: any){
    switch(lobId){
        case 1:
            let tierCount = formularyType === 1 ? 7 : 6;
            return tierCount;
        case 2:
            return 3;
        case 3:
            return 20;
        case 4:
            return 20;
        default:
            return 7;
    }
}