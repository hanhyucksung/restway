/**
 * 네이버 클라우드 Maps Directions 5 공식 API 어댑터.
 * https://api.ncloud-docs.com/docs/ko/application-maps-directions5
 * 이 앱의 UI는 현재 샘플 데이터만 사용합니다. 이 서버 API는 추후 실데이터 연결을 위한 백엔드입니다.
 * 프런트엔드에 API 키를 넣지 마세요.
 */
const ENDPOINT='https://maps.apigw.ntruss.com/map-direction/v1/driving';
export function parseCoordinates(value) {
 if(!/^\s*-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?\s*$/.test(value||''))throw new Error('좌표는 경도,위도 순서여야 합니다.');
 const [lon,lat]=value.split(',').map(Number);
 if(!Number.isFinite(lon)||!Number.isFinite(lat)||lon < -180 || lon >180 ||lat < -90||lat >90)throw new Error('좌표 범위가 올바르지 않습니다.');
 return `${lon},${lat}`;
}
export async function getDirections({start,goal,mileage=12,fueltype='gasoline',cartype='1'}, {keyId=process.env.NAVER_MAPS_KEY_ID,key=process.env.NAVER_MAPS_KEY,fetchImpl=fetch}={}) {
 if(!keyId||!key)throw Object.assign(new Error('NAVER_MAPS_KEY_ID 및 NAVER_MAPS_KEY 서버 환경변수가 필요합니다.'),{code:'NOT_CONFIGURED'});
 const u=new URL(ENDPOINT);
 u.searchParams.set('start',parseCoordinates(start));u.searchParams.set('goal',parseCoordinates(goal));
 u.searchParams.set('option','trafast:traavoidtoll:traoptimal');
 u.searchParams.set('mileage',String(mileage));u.searchParams.set('fueltype',fueltype);u.searchParams.set('cartype',cartype);
 const response=await fetchImpl(u,{headers:{'x-ncp-apigw-api-key-id':keyId,'x-ncp-apigw-api-key':key},signal:AbortSignal.timeout(12000)});
 if(!response.ok)throw Object.assign(new Error(`Directions API HTTP ${response.status}`),{code:'UPSTREAM_ERROR'});
 const json=await response.json();
 if(json.code!==0||!json.route)throw Object.assign(new Error(`Directions API 응답 오류: ${json.message||json.code}`),{code:'UPSTREAM_ERROR'});
 const result=[];
 for(const [option,values] of Object.entries(json.route)){
  for(const r of values){result.push({option,distanceKm:Math.round(r.summary.distance/100)/10,durationMinutes:Math.round(r.summary.duration/60000),tollWon:r.summary.tollFare,fuelWon:r.summary.fuelPrice,path:r.path});}
 }
 return {source:'NAVER Cloud Maps Directions 5',live:true,note:'반환된 경로만 실제 길찾기 결과입니다. 휴게소 방향·진입 가능 여부는 별도 검증이 필요합니다.',routes:result};
}
