export default function getLobCode(lobId: any, optional?: boolean){
    switch(lobId){
        case 1:
            return 'MCR';
        case 2:
            return optional?'MCDDF':'MCD';
        case 3:
            return optional?'COMMDF':'COMM';
        case 4:
            return optional?'COMMDF':'COMM';
        default:
            return 'MCR';
    }
}
