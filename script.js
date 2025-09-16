// Initialize GSAP animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Animate elements with the "slide-up" class
gsap.utils.toArray(".slide-up").forEach(el => {
  gsap.fromTo(el,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play reverse play reverse", // animate on scroll in and out
        markers: false // 
      }
    }
  );
});

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1 && document.querySelector(targetId)) {
      e.preventDefault();
      gsap.to(window, { duration: 0.9, scrollTo: targetId, ease: "power2.out" });
    }
  });
});

// Back to top button behavior
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  const showBtn = () => {
    backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
    backToTopButton.classList.add('opacity-100');
  };
  const hideBtn = () => {
    backToTopButton.classList.add('opacity-0', 'pointer-events-none');
    backToTopButton.classList.remove('opacity-100');
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      showBtn();
    } else {
      hideBtn();
    }
  });

  backToTopButton.addEventListener('click', () => {
    gsap.to(window, { duration: 0.9, scrollTo: 0, ease: "power2.inOut" });
  });
}

// Chatbot wiring
(function initChatbot() {
  const toggle = document.getElementById('chatToggle');
  const widget = document.getElementById('chatWidget');
  const closeBtn = document.getElementById('chatClose');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const messages = document.getElementById('chatMessages');
  if (!toggle || !widget || !closeBtn || !input || !sendBtn || !messages) return;

  const resolveEndpoint = () => {
    return (
      localStorage.getItem('gradient_endpoint') ||
      'https://ijpyvk7ggnzqoes2yww2nixu.agents.do-ai.run'
    );
  };

  const appendMessage = (role, text) => {
    const wrap = document.createElement('div');
    wrap.className = role === 'user' ? 'text-right' : 'text-left';
    const bubble = document.createElement('div');
    bubble.className = role === 'user'
      ? 'inline-block bg-teal-600 text-white px-3 py-2 rounded-xl max-w-[85%]'
      : 'inline-block bg-gray-100 text-gray-900 px-3 py-2 rounded-xl max-w-[85%]';
    bubble.textContent = text;
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  };

  const appendSystem = (text) => {
    const p = document.createElement('div');
    p.className = 'text-[12px] text-gray-500';
    p.textContent = text;
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight;
  };

  const sendToAgent = async (userText) => {
    const apiKey = localStorage.getItem('gradient_api_key');
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain;q=0.9' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    try {
      const endpoint = resolveEndpoint();

      // Attempt 1: POST with messages (OpenAI-style)
      let res = await fetch(endpoint, {
        method: 'POST',
        headers,
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are Trusted Tails assistant. Be concise and helpful.' },
            { role: 'user', content: userText }
          ]
        })
      });

      // If Method Not Allowed, try GET fallback
      if (res.status === 405) {
        const url = new URL(endpoint);
        url.searchParams.set('q', userText);
        res = await fetch(url.toString(), { method: 'GET', headers: { 'Accept': 'application/json, text/plain;q=0.9' }, mode: 'cors', credentials: 'omit' });
      }

      // If Bad Request, try POST with {input}
      if (!res.ok && res.status === 400) {
        res = await fetch(endpoint, {
          method: 'POST',
          headers,
          mode: 'cors',
          credentials: 'omit',
          body: JSON.stringify({ input: userText })
        });
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0,200)}`);
      }

      // Try JSON first, fallback to text
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        const reply = data.reply || data.output || data.content || data.text || (data.choices && data.choices[0] && (data.choices[0].message?.content || data.choices[0].text)) || JSON.stringify(data);
        appendMessage('assistant', reply);
      } else {
        const text = await res.text();
        appendMessage('assistant', text);
      }
    } catch (err) {
      appendSystem(`Error: ${err.message}`);
    }
  };

  const handleSend = () => {
    const txt = (input.value || '').trim();
    if (!txt) return;
    appendMessage('user', txt);
    input.value = '';
    appendSystem('Thinking...');
    sendToAgent(txt).finally(() => {
      // remove last system "Thinking..."
      const last = messages.querySelector('.text-[12px]:last-child');
      if (last && last.textContent === 'Thinking...') messages.removeChild(last);
    });
  };

  toggle.addEventListener('click', () => {
    widget.classList.toggle('hidden');
  });
  closeBtn.addEventListener('click', () => widget.classList.add('hidden'));
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
})();

