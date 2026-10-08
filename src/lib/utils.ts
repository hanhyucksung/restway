import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
export function cn(...inputs:ClassValue[]) {return twMerge(clsx(inputs))}
export const krw=(x:number)=>`${Math.round(x).toLocaleString('ko-KR')}원`
export const km=(x:number)=>`${Math.round(x).toLocaleString('ko-KR')}km`
export function travelTime(minutes:number) {return minutes>=60?`${Math.floor(minutes/60)}시간 ${String(minutes%60).padStart(2,'0')}분`:`${minutes}분`}
export function calcFuel(distanceKm:number,mileage:number,unitPrice:number) {return Math.round((distanceKm/Math.max(0.1,mileage))*unitPrice/10)*10}
export function totalCost(toll:number,fuel:number) {return toll+fuel}
