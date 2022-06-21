import {  formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';


export const getFormattedDate = (date: any) => {
    
    const fromNow = formatDistanceToNow(date, { addSuffix: true, locale: es }); 
    
    return fromNow;
}
