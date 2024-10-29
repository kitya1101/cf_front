// src/routes/api/search/+server.js
import { error, json } from '@sveltejs/kit';

export const GET = async ({ url, platform, fetch }) => {
	const query = url.searchParams.get('query')?.replace('#', '');
	const debugMode = url.searchParams.get('debugMode') === 'true';

	if (!query) {
		throw error(400, 'Query parameter is required');
	}

	try {
		// 디버그 모드일 경우 바로 Heroku API 호출
		if (debugMode) {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/search?query=${encodeURIComponent(query)}&debugMode=true`
			);
			const data = await response.json();
			return json(data);
		}

		// KV 캐시 확인
		if (!platform?.env?.HASHTAG_CACHE) {
			throw new Error('HASHTAG_CACHE is not available');
		}

		const cached = await platform.env.HASHTAG_CACHE.get(query, 'json');
		if (cached) {
			console.log('Cache hit:', query);
			return json(cached);
		}

		// Heroku API 호출
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/search?query=${encodeURIComponent(query)}`
		);
		const data = await response.json();

		// KV에 결과 저장
		const cacheData = {
			...data,
			cached_at: new Date().toISOString()
		};

		await platform.env.HASHTAG_CACHE.put(query, JSON.stringify(cacheData), {
			expirationTtl: 60 * 60 * 24 * 7
		});

		return json(data);
	} catch (err) {
		console.error('Search error:', err);
		return json({ error: err.message || 'Internal Server Error' }, { status: 500 });
	}
};
