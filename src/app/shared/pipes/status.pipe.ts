import { Pipe,PipeTransform} from "@angular/core";

@Pipe({
    name:'ActiveInactive'
})
export class statusPipe implements PipeTransform{

    transform(value: string, ...args: any[]):any {
       if(value === null || value === undefined){
        return 'unknown';
       };
       const valueLower = value.toLowerCase();
       switch(valueLower){
        case 'a': return 'Active';
        case 'd': return 'Inactive';
        default:return 'Unknown'
       }
    }
}