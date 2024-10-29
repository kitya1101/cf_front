// src/routes/api/search/+server.js
import { error, json } from '@sveltejs/kit';

export const GET = async ({ url, platform }) => {
    const query = url.searchParams.get('query')?.replace('#', '');
    const debugMode = url.searchParams.get('debugMode') === 'true';

    if (!query) {
        throw error(400, 'Query parameter is required');
    }

    try {
        // 디버그 모드일 경우 바로 Heroku API 호출 (캐시 사용 안 함)
        if (debugMode) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/search?query=${encodeURIComponent(query)}&debugMode=true`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return json(await response.json());
        }

        // 프로덕션 모드: KV 캐시 확인
        const cached = await platform.env.HASHTAG_CACHE.get(query, 'json');
        
        if (cached) {
            console.log('Cache hit:', query);
            return json(cached);
        }

        // 캐시 미스: Heroku API 호출
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/search?query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // API 응답을 KV에 저장
        const cacheData = {
            ...data,
            cached_at: new Date().toISOString()
        };
        
        await platform.env.HASHTAG_CACHE.put(query, JSON.stringify(cacheData), {
            expirationTtl: 60 * 60 * 24 * 7 // 7일 후 만료
        });

        return json(data);
    } catch (err) {
        console.error('Search failed:', err);
        throw error(500, 'Failed to fetch data');
    }
};