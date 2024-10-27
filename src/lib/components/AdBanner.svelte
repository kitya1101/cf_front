<!-- src/lib/components/AdBanner.svelte -->
<script>
    import { onMount } from 'svelte';
    
    export let adSlot = '';
    
    onMount(() => {
      try {
        if (typeof window.adsbygoogle === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9494807616794374';
          script.async = true;
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
        }
        
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense 초기화 오류:', error);
      }
    });
  </script>
  
  <div class="ad-container">
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-9494807616794374"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
  
  <style>
    .ad-container {
      width: 100%;
      max-width: 700px;
      margin: 20px auto;
      text-align: center;
      background: #fafafa;
      padding: 10px;
      border-radius: 8px;
    }
  </style>