const CATALOG = [
  // Edite aqui conforme seu uso legítimo (ex.: serviços, acessórios, mídia própria)
  { name: "Halo (Exemplo)", tags: ["Ação", "Coop"], desc: "Item de exemplo para demonstrar o catálogo.", featured: true },
  { name: "Forza (Exemplo)", tags: ["Corrida"], desc: "Item de exemplo para demonstrar o catálogo.", featured: true },
  { name: "Gears (Exemplo)", tags: ["Ação", "Coop"], desc: "Item de exemplo para demonstrar o catálogo.", featured: false },
  { name: "Skyrim (Exemplo)", tags: ["RPG"], desc: "Item de exemplo para demonstrar o catálogo.", featured: false },
  { name: "Minecraft (Exemplo)", tags: ["Aventura", "Coop"], desc: "Item de exemplo para demonstrar o catálogo.", featured: false },
];

const $ = (q) => document.querySelector(q);
const catalogGrid = $("#catalogGrid");
const featuredGrid = $("#featuredGrid");
const countEl = $("#count");
const searchEl = $("#search");

function card(item, badgeText = "") {
  const tags = item.tags.map(t => `<span class="tag">${t}</span>`).join("");
  const badge = badgeText ? `<span class="badge">${badgeText}</span>` : "";
  return `
    <div class="card">
      <div class="card-top">
        <div class="badge" style="visibility:${badgeText ? "visible" : "hidden"}">${badgeText || " "}</div>
        ${badge}
      </div>
      <div class="title">${escapeHtml(item.name)}</div>
      <div class="meta">${tags}</div>
      <p class="desc">${escapeHtml(item.desc)}</p>
    </div>
  `;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[s]));
}

function render(list) {
  catalogGrid.innerHTML = list.map(i => card(i)).join("");
  countEl.textContent = `${list.length} item(ns)`;
}

function renderFeatured() {
  const featured = CATALOG.filter(i => i.featured).slice(0, 6);
  featuredGrid.innerHTML = featured.map(i => card(i, "Destaque")).join("");
}

function applyFilter(query) {
  const q = query.trim().toLowerCase();
  const filtered = CATALOG.filter(item => {
    const inName = item.name.toLowerCase().includes(q);
    const inTags = item.tags.some(t => t.toLowerCase().includes(q));
    return q === "" ? true : (inName || inTags);
  });
  render(filtered);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  const tag = btn.getAttribute("data-chip");
  searchEl.value = tag;
  applyFilter(tag);
});

searchEl?.addEventListener("input", (e) => applyFilter(e.target.value));

$("#year").textContent = new Date().getFullYear();

$("#sendBtn").addEventListener("click", () => {
  const name = $("#name").value.trim();
  const msg = $("#msg").value.trim();

  const text = `Olá! Meu nome é ${name || "—"}. ${msg || ""}`.trim();
  const phone = "5599999999999"; // <-- troque pelo seu número (DDI+DDD+numero, sem + e sem espaços)
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

renderFeatured();
render(CATALOG);