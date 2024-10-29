<script>
	import { onMount } from 'svelte';

	export let adSlot = '';
	export let format = 'auto'; // 새로운 prop 추가
	export let responsive = true; // 새로운 prop 추가

	let adInitialized = false;

	onMount(() => {
		initializeAds();
	});

	async function initializeAds() {
		if (adInitialized) return;

		try {
			// Google AdSense 스크립트가 아직 로드되지 않은 경우에만 로드
			if (typeof window.adsbygoogle === 'undefined') {
				await loadAdSenseScript();
			}

			// 광고 푸시
			(window.adsbygoogle = window.adsbygoogle || []).push({});
			adInitialized = true;
		} catch (error) {
			console.error('AdSense initialization error:', error);
		}
	}

	function loadAdSenseScript() {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src =
				'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9494807616794374';
			script.async = true;
			script.crossOrigin = 'anonymous';

			script.onload = resolve;
			script.onerror = reject;

			document.head.appendChild(script);
		});
	}
</script>

<div class="ad-container">
	<ins
		class="adsbygoogle"
		style="display:block;"
		data-ad-client="ca-pub-9494807616794374"
		data-ad-slot={adSlot}
		data-ad-format={format}
		data-full-width-responsive={responsive}
	/>
</div>

<style>
	.ad-container {
		width: 100%;
		max-width: 700px;
		margin: 20px auto;
		text-align: center;
		background: transparent;
		min-height: 90px;
		overflow: hidden;
	}

	/* 모바일 최적화 */
	@media (max-width: 768px) {
		.ad-container {
			margin: 10px auto;
			padding: 0 10px;
		}
	}
</style>
