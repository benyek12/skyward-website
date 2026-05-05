/* ================================================
   SKYWARD OFFICIAL — main.js
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL REVEAL ─────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 120);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));


  /* ── NAV SCROLL SHRINK ─────────────────────────── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  /* ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── ACTIVE NAV LINK ON SCROLL ──────────────────── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activateNavLink = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}`
        ? 'var(--text)'
        : '';
    });
  };

  window.addEventListener('scroll', activateNavLink, { passive: true });


  /* ── CURSOR GLOW EFFECT ─────────────────────────── */
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  // Inject cursor style
  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    .cursor-glow {
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,45,32,0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: left 0.12s ease, top 0.12s ease;
    }
  `;
  document.head.appendChild(cursorStyle);


  /* ── MAP CARD HOVER TILT ────────────────────────── */
  document.querySelectorAll('.map-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});


/* ── ROBLOX STATS REALTIME ────────────────────────── */
const GAMES = [
  {
    universeId: '10100684184',
    elVisits: '#visits-1',
    elFavs:   '#favs-1'
  },
  {
    universeId: '9313724536',
    elVisits: '#visits-2',
    elFavs:   '#favs-2'
  }
];

async function fetchRobloxStats() {
  for (const game of GAMES) {
    try {
      const res  = await fetch(`https://games.roblox.com/v1/games?universeIds=${game.universeId}`);
      const json = await res.json();
      const data = json?.data?.[0];

      const elVisits = document.querySelector(game.elVisits);
      const elFavs   = document.querySelector(game.elFavs);

      if (!data) { console.warn('No data for', game.universeId, json); return; }

      if (elVisits) elVisits.textContent = (data.visits || 0).toLocaleString('id-ID');
      if (elFavs)   elFavs.textContent   = (data.favoritedCount || 0).toLocaleString('id-ID');

    } catch (err) {
      console.warn('Gagal fetch:', err);
    }
  }
}

fetchRobloxStats();
setInterval(fetchRobloxStats, 60 * 1000);

/* ── TAMBAHKAN INI DI BAGIAN BAWAH main.js ──────── */

/* ── LOAD ANNOUNCEMENTS FROM SUPABASE ──────────── */
(async () => {
  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
    const sb = createClient(
      'https://fjzakreyvslntzhbuhkv.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqemFrcmV5dnNsbnR6aGJ1aGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NTQxODEsImV4cCI6MjA5MzUzMDE4MX0.8fOOaMDUuaGDqE8SRhwq9Pcw2qYQPca2cl_mNMHMClM'
    );

    const { data } = await sb.from('posts')
      .select('*, profiles(username)')
      .order('created_at', { ascending: false })
      .limit(5);

    const el = document.getElementById('announcements-list');
    if (!el) return;

    if (!data?.length) {
      el.innerHTML = '<div style="color:#888;text-align:center;padding:40px;">Belum ada pengumuman.</div>';
      return;
    }

    el.innerHTML = data.map(p => `
      <div style="
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px 24px;
      ">
        <div style="font-family:'Bebas Neue';font-size:1.2rem;letter-spacing:1px;margin-bottom:8px;">${p.title}</div>
        <div style="color:#ccc;font-size:0.95rem;line-height:1.7;">${p.content}</div>
        <div style="color:#555;font-size:0.75rem;margin-top:12px;">
          oleh @${p.profiles?.username || '?'} · ${new Date(p.created_at).toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'})}
        </div>
      </div>
    `).join('');
  } catch(e) {
    console.warn('Gagal load announcements:', e);
  }
})();
