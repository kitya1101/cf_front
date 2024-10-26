// src/routes/api/proxy/+server.js
import { error } from '@sveltejs/kit';

export async function GET({ request, getClientAddress, url }) {
    try {
        // 1. 실제 클라이언트 IP 주소 얻기 (디버그 모드와 관계없이 항상 실행)
        let clientIP = getClientAddress();
        const forwardedFor = request.headers.get('x-forwarded-for');
        const vercelIp = request.headers.get('x-real-ip');
        
        if (forwardedFor) {
            clientIP = forwardedFor.split(',')[0].trim();
        } else if (vercelIp) {
            clientIP = vercelIp;
        }

        // 2. 쿼리와 디버그 모드 파라미터 가져오기
        const searchQuery = url.searchParams.get('query');
        const debugMode = url.searchParams.get('debugMode') === 'true';

        if (debugMode) {
            // 디버그 모드: 하드코딩된 테스트 데이터 반환
            return new Response(JSON.stringify({
                media_count: 12345,
                related_hashtags: ['test1', 'test2', 'test3', 'test4', 'test5'],
                debug_info: {
                    mode: 'debug',
                    timestamp: new Date().toISOString(),
                    query: searchQuery,
                    client_ip: clientIP
                }
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } 

        // 프로덕션 모드: 실제 API 호출
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/search?query=${encodeURIComponent(searchQuery)}`, {
            headers: {
                'X-Real-IP': clientIP,
                'X-Forwarded-For': clientIP
            }
        });

        if (!response.ok) {
            throw error(response.status, response.statusText);
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (err) {
        console.error('Proxy error:', err);
        throw error(err.status || 500, err.message || 'Internal Server Error');
    }
}