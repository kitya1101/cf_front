// ratelimiter.js
export class RateLimiter {
	constructor(limit = 2, windowMs = 3600000) {
		// 1시간
		this.limit = limit;
		this.windowMs = windowMs;
		this.storageKey = 'rate_limit_data';
	}

	loadState() {
		try {
			const stored = localStorage.getItem(this.storageKey);
			if (stored) {
				return JSON.parse(stored);
			}
		} catch (error) {
			console.error('Rate limit 상태 로드 실패:', error);
		}
		return this.getInitialState();
	}

	saveState(state) {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(state));
		} catch (error) {
			console.error('Rate limit 상태 저장 실패:', error);
		}
	}

	getInitialState() {
		return {
			requestCount: 0,
			resetTimestamp: Date.now(),
			remainingRequests: this.limit
		};
	}

	checkLimit() {
		const state = this.loadState();
		const now = Date.now();

		// 시간 윈도우가 만료되었는지 확인
		if (now - state.resetTimestamp >= this.windowMs) {
			const newState = this.getInitialState();
			this.saveState(newState);
			return {
				allowed: true,
				...newState
			};
		}

		// 요청 한도 체크
		if (state.requestCount >= this.limit) {
			const resetIn = Math.ceil((this.windowMs - (now - state.resetTimestamp)) / 1000);
			return {
				allowed: false,
				resetIn,
				...state
			};
		}

		// 요청 카운트 증가
		const updatedState = {
			requestCount: state.requestCount + 1,
			resetTimestamp: state.resetTimestamp,
			remainingRequests: this.limit - (state.requestCount + 1)
		};
		this.saveState(updatedState);

		return {
			allowed: true,
			...updatedState
		};
	}

	reset() {
		const newState = this.getInitialState();
		this.saveState(newState);
		return newState;
	}
}
