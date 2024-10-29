<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { RateLimiter } from '$lib/utils/rateLimiter';
	import AdBanner from '$lib/components/AdBanner.svelte';
	const language = writable('en');
	const translations = {
		ko: {
			title: '해시태그 검색기',
			placeholder: '해시태그 입력...',
			search: '검색',
			error: '오류:',
			fetchError: '요청이 너무 많습니다. 나중에 다시 시도해주세요.',
			debugInfo: '디버그 정보',
			postCount: '게시물 수:',
			relatedHashtags: '관련 해시태그:',
			copyHashtags: '해시태그 복사',
			copySuccess: '복사 완료!',
			logo: 'TagTally',
			infoTitle: '해시태그 검색 및 생성기',
			infoSubtitle:
				'어떤 해시태그를 사용해야 할지 모르겠나요? Tagtally를 통해 키워드의 인기를 파악하고 키워드와 관련된 최고의 해시태그를 추천받을 수 있습니다.',
			features: [
				'인기 해시태그로 더 많은 관심을 끌어보세요',
				'키워드 인기를 한눈에 파악하고 최적의 해시태그를 찾아보세요',
				'Tagtally로 더 많은 팔로워에게 도달하세요',
				'해시태그 추천으로 간단하게 콘텐츠 노출을 늘리세요',
				'키워드 하나로 다양한 해시태그 추천을 받아보세요',
				'쉽고 빠르게, 인기 해시태그로 트렌드를 잡아보세요'
			]
		},
		en: {
			title: 'Hashtag Searcher',
			placeholder: 'Enter hashtag...',
			search: 'Search',
			error: 'Error:',
			fetchError: 'Too many requests. Please try again later.',
			debugInfo: 'Debug Info',
			postCount: 'Post Count:',
			relatedHashtags: 'Related Hashtags:',
			copyHashtags: 'Copy Hashtags',
			copySuccess: 'Copy Success!',
			logo: 'TagTally',
			infoTitle: 'Hashtag Search and Generator',
			infoSubtitle:
				'Not sure which hashtags to use? With Tagtally, you can understand keyword popularity and get recommendations for the best hashtags related to your keywords.',
			features: [
				'Attract more attention with popular hashtags',
				'Analyze keyword popularity and find optimal hashtags at a glance',
				'Reach more followers with Tagtally',
				'Increase content exposure easily with hashtag recommendations',
				'Get various hashtag recommendations from a single keyword',
				'Catch trends quickly and easily with popular hashtags'
			]
		},
		es: {
			title: 'Buscador de Hashtags',
			placeholder: 'Introducir hashtag...',
			search: 'Buscar',
			error: 'Error:',
			fetchError: 'Demasiadas solicitudes. Por favor, inténtelo más tarde.',
			debugInfo: 'Información de Depuración',
			postCount: 'Número de Publicaciones:',
			relatedHashtags: 'Hashtags Relacionados:',
			copyHashtags: 'Copiar Hashtags',
			copySuccess: '¡Copiado con Éxito!',
			logo: 'TagTally',
			infoTitle: 'Buscador y Generador de Hashtags',
			infoSubtitle:
				'¿No estás seguro de qué hashtags usar? Con Tagtally, puedes entender la popularidad de las palabras clave y obtener recomendaciones de los mejores hashtags relacionados.',
			features: [
				'Atrae más atención con hashtags populares',
				'Analiza la popularidad de palabras clave y encuentra hashtags óptimos de un vistazo',
				'Llega a más seguidores con Tagtally',
				'Aumenta la exposición de contenido fácilmente con recomendaciones de hashtags',
				'Obtén varias recomendaciones de hashtags de una sola palabra clave',
				'Captura tendencias rápida y fácilmente con hashtags populares'
			]
		},
		pt: {
			title: 'Pesquisador de Hashtags',
			placeholder: 'Digite a hashtag...',
			search: 'Pesquisar',
			error: 'Erro:',
			fetchError: 'Muitas solicitações. Tente novamente mais tarde.',
			debugInfo: 'Informações de Depuração',
			postCount: 'Contagem de Posts:',
			relatedHashtags: 'Hashtags Relacionadas:',
			copyHashtags: 'Copiar Hashtags',
			copySuccess: 'Copiado com Sucesso!',
			logo: 'TagTally',
			infoTitle: 'Pesquisador e Gerador de Hashtags',
			infoSubtitle:
				'Não sabe quais hashtags usar? Com o Tagtally, você pode entender a popularidade das palavras-chave e obter recomendações das melhores hashtags relacionadas.',
			features: [
				'Atraia mais atenção com hashtags populares',
				'Analise a popularidade das palavras-chave e encontre hashtags ideais rapidamente',
				'Alcance mais seguidores com o Tagtally',
				'Aumente a exposição do conteúdo facilmente com recomendações de hashtags',
				'Obtenha várias recomendações de hashtags a partir de uma única palavra-chave',
				'Capture tendências de forma rápida e fácil com hashtags populares'
			]
		},
		hi: {
			title: 'हैशटैग खोजक',
			placeholder: 'हैशटैग दर्ज करें...',
			search: 'खोजें',
			error: 'त्रुटि:',
			fetchError: 'बहुत अधिक अनुरोध। कृपया बाद में पुनः प्रयास करें।',
			debugInfo: 'डीबग जानकारी',
			postCount: 'पोस्ट की संख्या:',
			relatedHashtags: 'संबंधित हैशटैग:',
			copyHashtags: 'हैशटैग कॉपी करें',
			copySuccess: 'कॉपी सफल!',
			logo: 'TagTally',
			infoTitle: 'हैशटैग खोज और जनरेटर',
			infoSubtitle:
				'कौन से हैशटैग का उपयोग करना है, यह नहीं पता? Tagtally के साथ, आप कीवर्ड की लोकप्रियता को समझ सकते हैं और अपने कीवर्ड से संबंधित सर्वश्रेष्ठ हैशटैग की सिफारिशें प्राप्त कर सकते हैं।',
			features: [
				'लोकप्रिय हैशटैग के साथ अधिक ध्यान आकर्षित करें',
				'कीवर्ड की लोकप्रियता का विश्लेषण करें और एक नज़र में सर्वोत्तम हैशटैग खोजें',
				'Tagtally के साथ अधिक फॉलोअर्स तक पहुंचें',
				'हैशटैग सुझावों के साथ आसानी से कंटेंट एक्सपोजर बढ़ाएं',
				'एक कीवर्ड से विभिन्न हैशटैग सुझाव प्राप्त करें',
				'लोकप्रिय हैशटैग के साथ आसानी और तेज़ी से ट्रेंड को पकड़ें'
			]
		},
		ar: {
			title: 'باحث الهاشتاج',
			placeholder: 'أدخل الهاشتاج...',
			search: 'بحث',
			error: 'خطأ:',
			fetchError: 'طلبات كثيرة جداً. يرجى المحاولة لاحقاً.',
			debugInfo: 'معلومات التصحيح',
			postCount: 'عدد المنشورات:',
			relatedHashtags: 'الهاشتاجات ذات الصلة:',
			copyHashtags: 'نسخ الهاشتاجات',
			copySuccess: 'تم النسخ بنجاح!',
			logo: 'TagTally',
			infoTitle: 'باحث ومولد الهاشتاج',
			infoSubtitle:
				'غير متأكد من الهاشتاج الذي تريد استخدامه؟ مع Tagtally، يمكنك فهم شعبية الكلمات المفتاحية والحصول على توصيات لأفضل الهاشتاجات المرتبطة.',
			features: [
				'اجذب المزيد من الاهتمام مع الهاشتاجات الشائعة',
				'حلل شعبية الكلمات المفتاحية واعثر على الهاشتاجات المثالية بلمحة',
				'اصل إلى المزيد من المتابعين مع Tagtally',
				'زد من ظهور المحتوى بسهولة مع توصيات الهاشتاج',
				'احصل على توصيات هاشتاج متنوعة من كلمة مفتاحية واحدة',
				'اكتشف الاتجاهات بسرعة وسهولة مع الهاشتاجات الشائعة'
			]
		},
		id: {
			title: 'Pencari Tagar',
			placeholder: 'Masukkan tagar...',
			search: 'Cari',
			error: 'Kesalahan:',
			fetchError: 'Terlalu banyak permintaan. Silakan coba lagi nanti.',
			debugInfo: 'Info Debug',
			postCount: 'Jumlah Posting:',
			relatedHashtags: 'Tagar Terkait:',
			copyHashtags: 'Salin Tagar',
			copySuccess: 'Berhasil Disalin!',
			logo: 'TagTally',
			infoTitle: 'Pencari dan Generator Tagar',
			infoSubtitle:
				'Tidak yakin tagar mana yang harus digunakan? Dengan Tagtally, Anda dapat memahami popularitas kata kunci dan mendapatkan rekomendasi tagar terbaik yang terkait.',
			features: [
				'Tarik lebih banyak perhatian dengan tagar populer',
				'Analisis popularitas kata kunci dan temukan tagar optimal secara sekilas',
				'Jangkau lebih banyak pengikut dengan Tagtally',
				'Tingkatkan eksposur konten dengan mudah menggunakan rekomendasi tagar',
				'Dapatkan berbagai rekomendasi tagar dari satu kata kunci',
				'Tangkap tren dengan cepat dan mudah menggunakan tagar populer'
			]
		},
		tr: {
			title: 'Hashtag Arayıcı',
			placeholder: 'Hashtag girin...',
			search: 'Ara',
			error: 'Hata:',
			fetchError: 'Çok fazla istek. Lütfen daha sonra tekrar deneyin.',
			debugInfo: 'Hata Ayıklama Bilgisi',
			postCount: 'Gönderi Sayısı:',
			relatedHashtags: 'İlgili Hashtagler:',
			copyHashtags: 'Hashtagleri Kopyala',
			copySuccess: 'Kopyalama Başarılı!',
			logo: 'TagTally',
			infoTitle: 'Hashtag Arama ve Oluşturucu',
			infoSubtitle:
				'Hangi hashtagleri kullanacağınızdan emin değil misiniz? Tagtally ile anahtar kelimelerin popülerliğini anlayabilir ve ilgili en iyi hashtag önerilerini alabilirsiniz.',
			features: [
				'Popüler hashtagler ile daha fazla dikkat çekin',
				'Anahtar kelime popülerliğini analiz edin ve optimal hashtagleri bir bakışta bulun',
				'Tagtally ile daha fazla takipçiye ulaşın',
				'Hashtag önerileri ile içerik görünürlüğünü kolayca artırın',
				'Tek bir anahtar kelimeden çeşitli hashtag önerileri alın',
				'Popüler hashtagler ile trendleri hızlı ve kolay yakalayın'
			]
		},
		ru: {
			title: 'Поисковик Хэштегов',
			placeholder: 'Введите хэштег...',
			search: 'Поиск',
			error: 'Ошибка:',
			fetchError: 'Слишком много запросов. Пожалуйста, повторите попытку позже.',
			debugInfo: 'Отладочная Информация',
			postCount: 'Количество Постов:',
			relatedHashtags: 'Связанные Хэштеги:',
			copyHashtags: 'Копировать Хэштеги',
			copySuccess: 'Скопировано Успешно!',
			logo: 'TagTally',
			infoTitle: 'Поиск и Генератор Хэштегов',
			infoSubtitle:
				'Не уверены, какие хэштеги использовать? С Tagtally вы можете понять популярность ключевых слов и получить рекомендации лучших связанных хэштегов.',
			features: [
				'Привлекайте больше внимания с популярными хэштегами',
				'Анализируйте популярность ключевых слов и находите оптимальные хэштеги',
				'Достигайте большего числа подписчиков с Tagtally',
				'Легко увеличивайте охват контента с рекомендациями хэштегов',
				'Получайте различные рекомендации хэштегов из одного ключевого слова',
				'Быстро и легко следуйте трендам с популярными хэштегами'
			]
		},
		fr: {
			title: 'Recherche de Hashtags',
			placeholder: 'Entrez le hashtag...',
			search: 'Rechercher',
			error: 'Erreur:',
			fetchError: 'Trop de requêtes. Veuillez réessayer plus tard.',
			debugInfo: 'Informations de Débogage',
			postCount: 'Nombre de Publications:',
			relatedHashtags: 'Hashtags Associés:',
			copyHashtags: 'Copier les Hashtags',
			copySuccess: 'Copié avec Succès!',
			logo: 'TagTally',
			infoTitle: 'Recherche et Générateur de Hashtags',
			infoSubtitle:
				'Vous ne savez pas quels hashtags utiliser ? Avec Tagtally, vous pouvez comprendre la popularité des mots-clés et obtenir des recommandations pour les meilleurs hashtags associés.',
			features: [
				"Attirez plus d'attention avec des hashtags populaires",
				"Analysez la popularité des mots-clés et trouvez les hashtags optimaux en un coup d'œil",
				'Atteignez plus de followers avec Tagtally',
				"Augmentez facilement l'exposition de votre contenu avec des recommandations de hashtags",
				"Obtenez diverses recommandations de hashtags à partir d'un seul mot-clé",
				'Captez les tendances rapidement et facilement avec des hashtags populaires'
			]
		},
		ja: {
			title: 'ハッシュタグ検索',
			placeholder: 'ハッシュタグを入力...',
			search: '検索',
			error: 'エラー:',
			fetchError: 'リクエストが多すぎます。後でもう一度お試しください。',
			debugInfo: 'デバッグ情報',
			postCount: '投稿数:',
			relatedHashtags: '関連ハッシュタグ:',
			copyHashtags: 'ハッシュタグをコピー',
			copySuccess: 'コピー成功！',
			logo: 'TagTally',
			infoTitle: 'ハッシュタグ検索・ジェネレーター',
			infoSubtitle:
				'どのハッシュタグを使用すべきか迷っていますか？Tagtallyで、キーワードの人気度を理解し、関連する最適なハッシュタグのレコメンドを取得できます。',
			features: [
				'人気のハッシュタグでより多くの注目を集める',
				'キーワードの人気度を分析し、最適なハッシュタグを一目で見つける',
				'Tagtallyでより多くのフォロワーにリーチする',
				'ハッシュタグのレコメンドで簡単にコンテンツの露出を増やす',
				'1つのキーワードから様々なハッシュタグのレコメンドを取得',
				'人気のハッシュタグで素早く簡単にトレンドをキャッチする'
			]
		}
	};

	const languageList = [
		{ code: 'en', name: 'English' },
		{ code: 'es', name: 'Español' },
		{ code: 'pt', name: 'Português' },
		{ code: 'id', name: 'Bahasa Indonesia' },
		{ code: 'ar', name: 'العربية' },
		{ code: 'hi', name: 'हिन्दी' },
		{ code: 'tr', name: 'Türkçe' },
		{ code: 'ja', name: '日本語' },
		{ code: 'ko', name: '한국어' },
		{ code: 'fr', name: 'Français' },
		{ code: 'ru', name: 'Русский' }
	];
	let query = '';
	let loading = false;
	let errorKey = null;
	let mediaCount = null;
	let relatedHashtags = [];
	let debugInfo = null;
	let copySuccess = false;
	let currentLang;
	let buttonDisabled = false;
	let cooldownTimer = 0;
	const debugMode = true;
	let remainingRequests = 2; // 추가: 남은 요청 수 변수

	const rateLimiter = new RateLimiter(2, 3600000, debugMode);

	language.subscribe((value) => {
		currentLang = value;
	});

	async function searchHashtag() {
		if (!query || buttonDisabled) return;

		const limitCheck = rateLimiter.checkLimit();
		if (!limitCheck.allowed) {
			errorKey = 'fetchError';
			errorMessage = translations[currentLang].fetchError.replace(
				'{seconds}',
				limitCheck.resetIn.toString()
			);
			console.error(`Rate limit exceeded. Reset in ${limitCheck.resetIn} seconds`);
			return;
		}

		loading = true;
		errorKey = null;
		copySuccess = false;
		mediaCount = null;
		relatedHashtags = [];
		buttonDisabled = true;

		try {
			const apiUrl = import.meta.env.VITE_API_URL;
			if (!apiUrl) {
				console.error('API URL is not defined in environment variables');
				errorKey = 'fetchError';
				return;
			}
			const response = await fetch(
				`/api/search?query=${encodeURIComponent(query.replace('#', ''))}&debugMode=${debugMode}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			mediaCount = data.media_count;
			relatedHashtags = data.related_hashtags;

			// remainingRequests 업데이트
			remainingRequests = limitCheck.remainingRequests;

			console.log('Search successful', {
				mediaCount,
				relatedHashtags,
				remainingRequests
			});
		} catch (err) {
			console.error('Search failed:', err);
			errorKey = 'fetchError';
		} finally {
			loading = false;
			setTimeout(() => {
				buttonDisabled = false;
			}, 3000);
		}
	}

	function startCooldown() {
		buttonDisabled = true;
		cooldownTimer = 3;
		const interval = setInterval(() => {
			cooldownTimer--;
			if (cooldownTimer <= 0) {
				clearInterval(interval);
				buttonDisabled = false;
			}
		}, 1000);
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			searchHashtag();
		}
	}

	function handleInput(event) {
		const input = event.target;
		let value = input.value;
		value = value.replace(/#/g, '');
		input.value = value;
		query = '#' + value;
		input.setSelectionRange(value.length, value.length);
	}

	function copyHashtags() {
		const hashtagString = relatedHashtags.map((tag) => `#${tag}`).join(' ');
		navigator.clipboard.writeText(hashtagString).then(
			() => {
				copySuccess = true;
				setTimeout(() => (copySuccess = false), 2000);
			},
			(err) => {
				console.error('텍스트를 복사할 수 없습니다: ', err);
			}
		);
	}

	function goToHome(event) {
		if (
			event.type === 'click' ||
			(event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))
		) {
			console.log('홈 페이지로 이동');
		}
	}

	function changeLanguage(lang) {
		language.set(lang);
	}

	onMount(() => {
		const searchInput = document.getElementById('search-input');
		if (searchInput) {
			searchInput.value = '';
			searchInput.focus();
		}
		// 초기 상태 로드
		const limitState = rateLimiter.loadState();
		remainingRequests = limitState.remainingRequests;
	});

	$: errorMessage = errorKey ? translations[currentLang][errorKey] : null;
</script>

<main class="instagram-style">
	<nav class="app-bar">
		<div class="container">
			<button class="logo" on:click={goToHome} on:keydown={goToHome} aria-label="홈 페이지로 이동">
				{translations[currentLang].logo}
			</button>
			<div class="language-menu">
				<button class="language-button">
					{languageList.find((lang) => lang.code === currentLang).name}
				</button>
				<div class="language-dropdown">
					{#each languageList as lang}
						<button on:click={() => changeLanguage(lang.code)}>{lang.name}</button>
					{/each}
				</div>
			</div>
		</div>
	</nav>
	<div class="content">
		<div class="search-wrapper">
			<h1>{translations[currentLang].title}</h1>

			<div class="search-container">
				<div class="input-wrapper">
					<input
						id="search-input"
						type="text"
						on:input={handleInput}
						on:keydown={handleKeyDown}
						placeholder={translations[currentLang].placeholder}
						autocomplete="off"
					/>
				</div>
				<button
					on:click={searchHashtag}
					class="search-button"
					disabled={loading || !query || buttonDisabled}
				>
					{translations[currentLang].search}
				</button>
			</div>

			{#if loading}
				<div class="loading-container">
					<div class="loading-dots">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			{:else if errorMessage}
				<div class="error">
					<p>{translations[currentLang].error} {errorMessage}</p>
				</div>
			{:else if mediaCount !== null}
				<div class="results">
					<p class="media-count">
						{translations[currentLang].postCount}
						{mediaCount.toLocaleString()}
					</p>
					<h2>{translations[currentLang].relatedHashtags}</h2>
					<ul class="related-hashtags">
						{#each relatedHashtags as tag}
							<li>#{tag}</li>
						{/each}
					</ul>
					<button class="copy-button" on:click={copyHashtags}>
						{copySuccess
							? translations[currentLang].copySuccess
							: translations[currentLang].copyHashtags}
					</button>
				</div>
			{/if}
		</div>
	</div>
	<AdBanner adSlot="3010145096" format="auto" responsive={true} />
	<div class="info-section">
		<div class="info-wrapper">
			<div class="main-title">
				<h2>{translations[currentLang].infoTitle}</h2>
				<p class="subtitle">
					{translations[currentLang].infoSubtitle}
				</p>
			</div>

			<div class="features-grid">
				{#each translations[currentLang].features as feature}
					<div class="feature-card">
						<p>{feature}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<footer class="app-footer">
		<div class="footer-container">
			<div class="footer-content">© 2024 TagTally</div>
		</div>
	</footer>
</main>

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
	}

	.loading-dots {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading-dots div {
		width: 10px;
		height: 10px;
		margin: 0 5px;
		background-color: #e1306c; /* Pink color */
		border-radius: 50%;
		animation: bounce 0.5s infinite alternate;
	}

	.loading-dots div:nth-child(2) {
		background-color: #c13576; /* Orange color */
		animation-delay: 0.1s;
	}

	.loading-dots div:nth-child(3) {
		background-color: #b03ab4; /* Yellow color */
		animation-delay: 0.2s;
	}

	@keyframes bounce {
		to {
			transform: translateY(-10px);
		}
	}
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #fafafa;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.instagram-style {
		color: #262626;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.app-bar {
		min-width: 500px;
		background: linear-gradient(
			45deg,
			#405de6,
			#5b51d8,
			#833ab4,
			#c13584,
			#e1306c,
			#fd1d1d,
			#f56040,
			#f77737,
			#fcaf45,
			#ffdc80
		);
		padding: 20px 0; /* 증가된 패딩 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.app-bar .container {
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-family: 'Instagram Sans', sans-serif;
		font-size: 28px;
		font-weight: 600;
		color: #ffffff;
		cursor: pointer;
		background: none;
		border: none;
		padding: 10px 0;
		line-height: 1.2;
	}

	.logo:hover {
		opacity: 0.8;
	}

	.content {
		flex-grow: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 60px;
		padding-bottom: 30px;
		box-sizing: border-box;
	}

	.search-wrapper {
		width: 100%;
		max-width: 750px; /* 증가된 최대 너비 */
		min-width: 500px;
		min-height: 300px;
		background-color: #ffffff;
		border-radius: 50px;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		padding: 50px; /* 증가된 패딩 */
		box-sizing: border-box;
	}

	h1 {
		/*풀사이즈*/
		text-align: center;
		color: rgb(34, 84, 131);
		margin-bottom: 40px; /**/
		font-size: 50px; /* 증가된 폰트 크기 */
		font-weight: 500;
	}

	.search-container {
		display: flex;
		margin-bottom: 20px; /* */
	}

	.input-wrapper {
		position: relative;
		flex-grow: 1;
	}

	input {
		width: 100%;
		padding: 15px 15px 15px 45px; /* 증가된 패딩 */
		border: 1px solid #dbdbdb;
		border-radius: 3px 0 0 3px;
		font-size: 18px; /* 증가된 폰트 크기 */
		outline: none;
		box-sizing: border-box;
		caret-color: #262626;
		color: #262626;
	}

	input::placeholder {
		color: #8e8e8e;
	}

	.input-wrapper::before {
		content: '#';
		position: absolute;
		left: 18px; /* 조정된 위치 */
		top: 45%;
		transform: translateY(-50%);
		color: #c7c7c7;
		font-size: 24px; /* 증가된 폰트 크기 */
		pointer-events: none;
	}
	.search-button {
		padding: 15px 25px;
		background: #405ce6be; /* Original background color */
		color: white;
		border: none;
		border-radius: 0 3px 3px 0;
		cursor: pointer;
		font-size: 18px;
		font-weight: 600;
		transition: background-color 0.3s;
	}

	.search-button:hover {
		background: #5b6dec; /* Slightly lighter shade of the original color */
	}

	.search-button:disabled {
		background-color: #b2dffc;
		cursor: not-allowed;
	}

	.error {
		color: #ff2a2a; /* Instagram 스타일의 빨간색 */
		font-weight: bold;
		padding: 10px;
		border-radius: 5px;
		background-color: #ffebee; /* 연한 빨간색 배경 */
		margin-bottom: 15px;
	}

	.results {
		background-color: #fafafa;
		border-radius: 8px;
		padding: 25px;
		margin-bottom: 25px;
	}

	.results h2 {
		color: #262626; /* Instagram 스타일의 검정색 */
		font-size: 25px;
		margin-bottom: 15px;
	}

	.media-count {
		font-weight: bold;
		font-size: 20px; /* 증가된 폰트 크기 */
		color: #262626;
		margin-bottom: 25px; /* 증가된 마진 */
	}

	.related-hashtags {
		list-style-type: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 12px; /* 증가된 간격 */
		margin-bottom: 25px; /* 증가된 마진 */
	}

	.related-hashtags li {
		background-color: #efefef;
		color: #262626;
		padding: 10px 18px; /* 증가된 패딩 */
		border-radius: 20px;
		font-size: 16px; /* 증가된 폰트 크기 */
		font-weight: 600;
	}
	.copy-button {
		width: 100%;
		background: #405ce6be; /* Pink/Yellow gradient */
		color: white;
		border: none;
		border-radius: 3px;
		padding: 15px 0;
		cursor: pointer;
		font-size: 18px;
		font-weight: 600;
		transition: background-color 0.3s;
	}

	.copy-button:hover {
		background: #5b6dec; /* Adjusted hover gradient */
	}

	input {
		padding-left: 37px; /* 패딩 조정 */
	}

	@media (max-width: 768px) {
		/* 브레이크포인트를 768px로 변경 */
		.search-wrapper {
			padding: 25px;
			max-width: 95%;
			min-width: 300px;
			min-height: 300px;
		}

		h1 {
			font-size: 41px;
		}

		.search-container {
			flex-direction: column;
		}

		.input-wrapper,
		.search-button {
			width: 100%;
		}

		input,
		.search-button {
			border-radius: 3px;
			font-size: 16px;
			padding: 12px 15px;
		}

		.input-wrapper::before {
			font-size: 20px;
			top: 48%;
			left: 15px;
		}
		input {
			font-size: 14px; /* 모바일에서 더 작은 크기로 조정 */
			padding: 12px 15px 12px 29px; /* 패딩 조정 */
		}

		.search-button {
			margin-top: 10px;
		}

		.related-hashtags li {
			font-size: 14px;
			padding: 8px 15px;
		}

		.copy-button {
			font-size: 16px;
			padding: 12px 0;
		}
	}
	.language-menu {
		position: relative;
		display: inline-block;
	}

	.language-button {
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		font-size: 20px;
		padding: 10px;
		display: flex;
		align-items: center;
	}

	.language-button::before {
		content: '';
		display: inline-block;
		width: 20px; /* Adjust the width as needed */
		height: 20px; /* Adjust the height as needed */
		background-image: url('/src/lib/image/lang.svg'); /* Provide the correct path to your image */
		background-size: cover;
		margin-right: 4px;
		margin-top: 1px;
	}

	.language-dropdown {
		display: none;
		position: absolute;
		right: 0;
		top: 100%;
		background-color: #ffffff;
		border-radius: 8px; /* 드롭다운에 둥근 테두리 추가 */
		min-width: 160px;
		box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
		z-index: 1;
		overflow: hidden; /* 테두리 밖으로 내용이 넘어가지 않도록 설정 */
	}

	.language-dropdown button {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		width: 100%;
		text-align: left;
		border: none;
		background: none;
		cursor: pointer;
	}

	.language-dropdown button:hover {
		background-color: #f1f1f1;
	}

	.language-menu:hover .language-dropdown {
		display: block;
	}

	@media (max-width: 768px) {
		.app-bar .container {
			flex-direction: column;
			align-items: flex-start;
		}

		.language-menu {
			align-self: flex-end;
			margin-top: -49px;
		}

		.search-button:disabled {
			background-color: #b2dffc;
			cursor: not-allowed;
		}
	}

	.info-section {
		width: 100%;
		background-color: #fafafa;
		padding: 60px 0;
		padding-top: 30px;
		margin-top: 40px;
		border-top: 1px solid #e6e6e6;
	}

	.info-wrapper {
		width: 100%;
		max-width: 1000px;
		min-width: 700px;
		margin: 0 auto;
		padding: 0 50px;
		box-sizing: border-box;
	}

	.main-title {
		text-align: center;
		margin-bottom: 50px;
		background: white;
		padding: 30px;
		padding-top: 10px;
		border-radius: 30px;
		color: #262626;
		border: 1px solid #f0f0f0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.main-title h2 {
		font-size: 36px;
		font-weight: 600;
		margin-bottom: 20px;
		background: linear-gradient(45deg, #405de6, #833ab4);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		font-size: 18px;
		line-height: 1.6;
		max-width: 800px;
		margin: 0 auto;
		color: #666;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 25px;
		margin-top: 40px;
	}

	.feature-card {
		background: white;
		padding: 30px;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		min-height: 60px;
		border: 1px solid #f0f0f0;
	}

	.feature-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 8px;
		height: 100%;
		background: linear-gradient(to bottom, #833ab4, #c13584);
	}

	.feature-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}

	.feature-card p {
		color: #444;
		font-size: 17px;
		font-weight: 500;
		line-height: 1.4;
		margin: 0;
		padding-left: 15px;
	}

	.app-footer {
		background-color: #ffffff;
		border-top: 1px solid #dbdbdb;
		padding: 20px 0;
		margin-top: 40px;
	}

	.footer-container {
		max-width: 1000px;
		min-width: 700px;
		margin: 0 auto;
		padding: 0 50px;
	}

	.footer-content {
		color: #8e8e8e;
		font-size: 14px;
		text-align: center;
	}

	@media (max-width: 768px) {
		.info-wrapper {
			min-width: 300px;
			padding: 0 25px;
		}

		.main-title {
			padding: 30px 20px;
		}

		.main-title h2 {
			font-size: 28px;
		}

		.subtitle {
			font-size: 16px;
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.feature-card {
			padding: 25px;
		}

		.footer-container {
			min-width: 300px;
			padding: 0 25px;
		}
	}
</style>
