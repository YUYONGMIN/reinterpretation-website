// DOM要素の取得
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');

// モーダル詳細データ
const modalData = {
    camera: {
        title: "フィルムカメラ：記録道具からファッションアイテムへ",
        content: `
            <h3>本来の目的</h3>
            <ul>
                <li>写真を撮るための道具</li>
                <li>記録を残すための機械</li>
            </ul>
            
            <h3>ユーザーによる再解釈</h3>
            <ul>
                <li>「エモい」雰囲気を作るアイテム</li>
                <li>ファッションアイテム</li>
                <li>SNS用写真演出</li>
                <li>不便さそのものを楽しむ体験</li>
            </ul>
            
            <h3>生まれた新しい文化</h3>
            <ul>
                <li>フィルム写真ブーム</li>
                <li>Y2K感性</li>
                <li>レトロ感性文化</li>
                <li>エモ写真共有</li>
            </ul>
            
            <h3>なぜこのような再解釈が生まれたか</h3>
            <ul>
                <li>デジタル写真にはない質感や偶然性に魅力を感じる人が増えたため</li>
                <li>「完璧ではない写真」に感情的価値を感じる文化が生まれたため</li>
                <li>SNSでレトロ感性が流行したため</li>
            </ul>
        `
    },
    icecream: {
        title: "明治エッセルスーパーカップ：食べ物からSNSコンテンツへ",
        content: `
            <h3>本来の目的</h3>
            <ul>
                <li>アイスクリームとして食べるための商品</li>
                <li>手軽に甘いものを楽しむための商品</li>
            </ul>
            
            <h3>ユーザーによる再解釈</h3>
            <ul>
                <li>アイスの食べ方を比較して楽しむ</li>
                <li>自分だけの食べ方をSNSで共有する</li>
                <li>表面を削る・混ぜるなど、食べる行為自体を遊びとして楽しむ</li>
                <li>「自分はどう食べるか」を話題にするコミュニケーションツールとして使う</li>
            </ul>
            
            <h3>生まれた新しい文化</h3>
            <ul>
                <li>「あなたはどう食べる？」文化</li>
                <li>アイスの食べ方共有文化</li>
                <li>SNSでの食べ方投稿</li>
                <li>商品を通じたユーザー同士の共感・会話</li>
            </ul>
            
            <h3>なぜこのような再解釈が生まれたか</h3>
            <ul>
                <li>人によって食べ方に個性が現れるため</li>
                <li>SNSによって「食べる過程」を共有する文化が広がったため</li>
                <li>単に味だけでなく、体験やコミュニケーションも楽しむ消費スタイルが増えたため</li>
                <li>企業側もユーザーの楽しみ方を認識し、「あなたはどう食べる？」という形で再び商品に取り入れたため</li>
            </ul>
        `
    },
    cafe: {
        title: "カフェ：食事の場から作業空間へ",
        content: `
            <h3>本来の目的</h3>
            <ul>
                <li>飲み物や食事を提供する場所</li>
                <li>休憩する空間</li>
            </ul>
            
            <h3>ユーザーによる再解釈</h3>
            <ul>
                <li>勉強する場所</li>
                <li>作業空間</li>
                <li>SNS用写真を撮る場所</li>
                <li>「雰囲気」を楽しむ場所</li>
            </ul>
            
            <h3>生まれた新しい文化</h3>
            <ul>
                <li>「映えるカフェ」文化</li>
                <li>カフェ巡り</li>
                <li>作業カフェ</li>
                <li>空間体験型消費</li>
            </ul>
            
            <h3>なぜこのような再解釈が生まれたか</h3>
            <ul>
                <li>人々が単なる飲食だけでなく、空間や雰囲気にも価値を感じるようになったため</li>
                <li>SNS文化によって「共有する空間」としての意味が強くなったため</li>
                <li>長時間滞在しやすい環境が増えたため</li>
            </ul>
        `
    }
};

// スムーズスクロール機能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // ナビゲーションバーの高さを考慮したオフセット
                const navHeight = 80;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// モーダル機能
function initModal() {
    // 詳細ボタンクリックイベント
    const exploreCards = document.querySelectorAll('.explore-card');
    exploreCards.forEach(card => {
        card.addEventListener('click', () => {
            const dataDetail = card.getAttribute('data-detail');
            showModal(dataDetail);
        });
    });

    // モーダル閉じるイベント
    closeModal.addEventListener('click', hideModal);
    
    // モーダル外クリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            hideModal();
        }
    });
}

function showModal(type) {
    const data = modalData[type];
    if (data) {
        modalBody.innerHTML = `
            <div class="modal-detail">
                <h2>${data.title}</h2>
                ${data.content}
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// グラフアニメーション
function initChartAnimation() {
    // 1秒後にグラフを設定して確実に実行
    setTimeout(() => {
        const bars = document.querySelectorAll('.bar-fill');
        console.log('Found bars:', bars.length);
        
        bars.forEach((bar, index) => {
            const barParent = bar.parentElement;
            const value = parseInt(barParent.getAttribute('data-value'));
            
            // 各グラフの最大値を計算
            const chart = barParent.closest('.bar-chart');
            const allBars = chart.querySelectorAll('.bar');
            let maxValue = 0;
            
            allBars.forEach(b => {
                const val = parseInt(b.getAttribute('data-value'));
                if (val > maxValue) maxValue = val;
            });
            
            // 高さを計算（値に応じて20px〜200pxの範囲）
            const minHeight = 30;
            const maxHeight = 200;
            const height = minHeight + ((value / maxValue) * (maxHeight - minHeight));
            
            console.log(`Bar ${index}: value=${value}人, maxValue=${maxValue}人, height=${height}px`);
            
            // ピクセル単位で高さを設定
            bar.style.height = height + 'px';
            bar.style.width = '50px';
            bar.style.backgroundColor = '#2563eb';
            bar.style.display = 'block';
        });
        
        // Intersection Observer版も追加
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const barParent = bar.parentElement;
                    const value = parseInt(barParent.getAttribute('data-value'));
                    
                    const chart = barParent.closest('.bar-chart');
                    const allBars = chart.querySelectorAll('.bar');
                    let maxValue = 0;
                    
                    allBars.forEach(b => {
                        const val = parseInt(b.getAttribute('data-value'));
                        if (val > maxValue) maxValue = val;
                    });
                    
                    const minHeight = 30;
                    const maxHeight = 200;
                    const height = minHeight + ((value / maxValue) * (maxHeight - minHeight));
                    
                    // アニメーション
                    bar.style.transition = 'height 1s ease';
                    bar.style.height = '10px';
                    
                    setTimeout(() => {
                        bar.style.height = height + 'px';
                    }, 100);
                }
            });
        }, observerOptions);
        
        bars.forEach(bar => {
            observer.observe(bar);
        });
    }, 1000);
}

// スクロール時のナビゲーションハイライト
function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // 全てのナビリンクからactiveクラスを削除
                navLinks.forEach(link => link.classList.remove('active'));
                
                // 対応するナビリンクにactiveクラスを追加
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// カードホバーアニメーション強化
function initCardAnimations() {
    const cards = document.querySelectorAll('.card, .case-card, .explore-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
}

// パララックス効果
function initParallax() {
    const heroSection = document.querySelector('#home');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallaxSpeed = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    });
}

// フェードインアニメーション
function initFadeInAnimation() {
    const fadeElements = document.querySelectorAll('.case-card, .insight-item, .example-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// カウンターアニメーション（グラフの数値）
function initCounterAnimation() {
    const counters = document.querySelectorAll('.bar-value');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetText = counter.textContent;
                const target = parseInt(targetText);
                let current = 0;
                
                const increment = target / 30; // 30フレームで完了
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + '人';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current) + '人';
                    }
                }, 50);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// レスポンシブメニュー（モバイル対応）
function initMobileMenu() {
    // モバイル画面でのナビゲーション改善
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        navMenu.style.display = 'flex';
        navMenu.style.flexWrap = 'wrap';
        navMenu.style.justifyContent = 'center';
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'flex';
            navMenu.style.flexWrap = 'wrap';
            navMenu.style.justifyContent = 'center';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexWrap = 'nowrap';
            navMenu.style.justifyContent = 'flex-end';
        }
    });
}

// 初期化関数
function init() {
    // 基本機能の初期化
    initSmoothScroll();
    initModal();
    initScrollSpy();
    
    // アニメーション機能の初期化
    initChartAnimation();
    initCardAnimations();
    initFadeInAnimation();
    initCounterAnimation();
    
    // レスポンシブ対応
    initMobileMenu();
    
    // パララックス効果（パフォーマンス考慮でオプション）
    if (window.innerWidth > 768) {
        initParallax();
    }
    
    console.log('Reinterpretation Site initialized successfully!');
}

// DOMロード完了後に初期化実行
document.addEventListener('DOMContentLoaded', init);

// ウィンドウリサイズ時の処理
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // リサイズ時の再調整処理
        initMobileMenu();
    }, 250);
});

// パフォーマンス最適化：スクロールイベントのスロットル
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// CSSアクティブクラスの追加
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb;
        font-weight: 600;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 2px;
        background-color: #2563eb;
    }
    
    .nav-link {
        position: relative;
    }
`;
document.head.appendChild(style);