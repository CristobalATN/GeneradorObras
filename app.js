const TipoObra = Object.freeze({
  MaestroOriginal: "Maestro Original",
  EpisodioOriginal: "Episodio Original",
  OriginalUnitario: "Original Unitario",
});

const SELECT_OPTIONS = Object.freeze({
  tipoObra: [TipoObra.MaestroOriginal, TipoObra.EpisodioOriginal, TipoObra.OriginalUnitario],
  formato: ["Largometraje", "Cortometraje", "Serie", "Telenovela", "Serie documental"],
  genero: ["Ficción", "Informativo", "Documental", "Reportaje"],
  sonido: ["Mudo", "Hablado"],
  color: ["Color", "Color + Blanco y negro", "En color", "Blanco y negro"],
  caracteristicas: ["Animación", "Animación + Actores", "Actores"],
  destino: ["Cine", "Televisión", "Internet", "Videograma (DVD, VHS)", "Dispositivos móviles", "Otros"],
});

const FIELD_KEYS = Object.freeze({
  codigoIda: "Código IDA",
  tipoObra: "Tipo de obra",
  titulo: "Título",
  tituloFormatoIda: "Título formato IDA",
  idioma: "Idioma",
  temporadasTotales: "Temporadas totales",
  cantidadEpisodios: "Cantidad de episodios",
  duracionMinMax: "Duración min / max",
  formato: "Formato",
  genero: "Género",
  sonido: "Sonido",
  color: "Color",
  caracteristicasTecnicas: "Características técnicas",
  destino: "Destino",
  productora: "Productora",
  anioProduccion: "Año de producción",
  paisProduccion: "País de producción",
});

const worksList = document.getElementById("worksList");
const addRowBtn = document.getElementById("addRowBtn");
const downloadMastersBtn = document.getElementById("downloadMastersBtn");
const downloadEpisodesBtn = document.getElementById("downloadEpisodesBtn");
const downloadParticipationsBtn = document.getElementById("downloadParticipationsBtn");
const downloadAllBtn = document.getElementById("downloadAllBtn");

// Datos de obras incrustados directamente para funcionar sin servidor
const OBRAS_DATA = [
  "Zander",
  "Celeste",
  "Amor en línea",
  "Paola y Miguelito",
  "Verdades ocultas",
  "Donde hubo fuego",
  "Enigma",
  "Alma negra",
  "La Fiera",
  "La Reina de Franklin",
  "Los Ángeles de Estela",
  "Los Capo",
  "Los Carcamales",
  "Los Pincheira",
  "Machos",
  "Martín, el Hombre y la Leyenda",
  "Mi Familia Chilena",
  "Pacto de Sangre",
  "Papá a la Deriva",
  "Papi Ricky",
  "Pituca sin Lucas",
  "Pobre Gallo",
  "Pobre Novio",
  "Río Oscuro",
  "Rojo y Miel",
  "Romané",
  "Rompecorazón",
  "Si Yo Fuera Rico",
  "Solamente Julia",
  "Solita Camino",
  "Sres. Papis",
  "Te Doy la Vida (CL)",
  "Tranquilo Papá",
  "Wena Profe",
  "Yo Soy Lorenzo",
  "El Camionero",
  "El Amor Está de Moda",
  "Ecos del Desierto",
  "Eclipse de Luna",
  "Dos por Uno",
  "¿Dónde Está Elisa?",
  "Edificio Corona",
  "Disparejas",
  "Dime con Quién Andas",
  "Destinos Cruzados",
  "Descarado",
  "Demente",
  "Dama y Obrero",
  "Dale Ritmo al Verano",
  "Conde Vrolok",
  "Cómplices",
  "Como la Vida Misma",
  "Cómo Aprenden Matemática los Niños",
  "Cobre, La Historia de una Nación",
  "Ciudadano K",
  "Chile: Cinco Siglos de Cultura",
  "Champaña",
  "Colonia Dignidad: Una Secta Alemana en Chile",
  "Casados",
  "Casa de Angelis",
  "Búscate la Vida",
  "Buscando a María",
  "Brujas",
  "Borrón y Cuenta Nueva",
  "Aquí No Hay Quien Viva",
  "Aquí Mando Yo",
  "Aquelarre",
  "Nuevo Amores de Mercado",
  "Amores de Mercado",
  "Amor en Tiempo Récord",
  "Ámbar",
  "Amor a la Catalán",
  "Amar Profundo",
  "Ámame",
  "Alguien te Mira",
  "Aires de Chile",
  "Aguas de Oro",
  "Adrenalina",
  "40 y tantos",
  "17",
  "16",
  "31 Minutos",
  "100 Días para Enamorarse (CL)",
  "Fragmentos de la Memoria (Test)",
  "Baby Bandito",
  "Papá en apuros",
  "Al sur del corazón",
  "La vida es un sueño",
  "Microterricolas",
  "La ley de Baltazar",
  "Mundo perro",
  "Juegos de poder",
  "Casa de muñecos",
  "Amanda",
  "Horacio y los Plasticines",
  "¿Cómo nacen los chilenos?",
  "¿Con qué sueñas?",
  "Achú",
  "Amor por accidente (CL)",
  "Sueños latinoamericanos",
  "Mente Fría",
  "El diario secreto de una profesional",
  "La sangre tira",
  "El reemplazante",
  "Ellas por ellas",
  "Feroz",
  "El ritmo de Chile",
  "Ídolos",
  "El Coleccionista de Historias y Tesoros",
  "¿Quién mató a Sara?",
  "Recetas de abuelita",
  "Perfil falso",
  "Raffi",
  "Notes from nothing",
  "¿Qué pasó con mi curso?",
  "Príncipes de barrio",
  "Marta a las Ocho",
  "Naufragios",
  "Mi Nombre es Lara",
  "Mundo Cooperativo",
  "Las Dos Caras del Amor",
  "La sangre del camaleón",
  "Marrón Glacé",
  "Top Secret",
  "Villa Dulce",
  "Loca Piel",
  "Ursi y Magnogeek, exploradores de otro mundo",
  "Marrón Glacé: El Regreso",
  "Urgencias",
  "Sucupira",
  "Renata y los problemas",
  "Juegos de Fuego",
  "Renata y los nuevos problemas",
  "Oro Verde",
  "Renata y las tablas de multiplicar",
  "Tic Tac",
  "Renata",
  "Iorana",
  "Ramona",
  "Santo Ladrón",
  "Los Pulentos",
  "Purasangre",
  "Puerto Papel",
  "Pecadores",
  "Prófugos",
  "Hippie",
  "Piedra, papel y tijera",
  "Los Treinta",
  "Petit",
  "Versus",
  "Pandamonkeys",
  "Gatas y Tuercas",
  "Pajareando aprendo",
  "Floribella",
  "Okupas",
  "Fortunato",
  "Niños inmigrantes",
  "La Marca del Deseo",
  "Mi primera vez",
  "Las Profesionales a su Servicio",
  "Memorias de árboles",
  "El Señor de la Querencia",
  "Mary and Mike",
  "Sin Anestesia",
  "Los años dorados",
  "La Familia de al Lado",
  "Locos Lab",
  "Martín Rivas",
  "Soltera otra vez",
  "Mujeres de Lujo",
  "Santiago Paranormal",
  "Primera Dama",
  "Más que amigos",
  "La Doña",
  "Doña Bella",
  "Esperanza",
  "Violeta se fue a los Cielos",
  "Infiltradas",
  "Yo lo Puedo Hacer",
  "El Laberinto de Alicia",
  "Voy y vuelvo",
  "La Sexóloga",
  "Viejo Zorro",
  "Pobre Rico",
  "Teresa de los Andes",
  "Separados",
  "Santiago no es Chile",
  "El Regreso",
  "La Vega",
  "Graduados",
  "Isabel: La Vida Íntima de la Escritora Isabel Allende",
  "Socias",
  "Invasores: Especies y Territorios en Pugna",
  "Vuelve Temprano",
  "Inmigrantes (2018)",
  "La Impostora",
  "Inmigrantes (2000)",
  "Mamá Mechona",
  "I Love Robin",
  "Volver a Amar",
  "Hostal Morrison",
  "Esa No Soy Yo",
  "Hola, Flinko",
  "Un Diablo con Ángel",
  "Historias de Cuarentena",
  "Veinteañero a los 40",
  "Heredia y Asociados",
  "Vuelve Temprano (MX)",
  "Helados",
  "Tenías que ser tú",
  "Grandes Pillos",
  "Los Casablanca",
  "El Hombre de Tu Vida",
  "El Señor de la Querencia (2024)",
  "El Cuento del Tío",
  "Secretos de familia",
  "El Blog de la Feña",
  "El Jardín de Olivia",
  "El Aval",
  "Dignidad",
  "El Circo de las Montini",
  "Descorchando Chile",
  "Eres mi Tesoro",
  "Deportes sin Límites",
  "Gemelas",
  "Coleccionista de Premios",
  "Generación 98",
  "Bichos Raros",
  "Hasta Encontrarte",
  "Apasionados",
  "Hijos del Desierto",
  "Años Después: ¿Con Qué Sueñas?",
  "Hijos del Monte",
  "Amango",
  "Isla Paraíso",
  "Adoptados: La Historia que Nos Falta",
  "La Chúcara",
  "Algo habrán hecho por la historia de Chile",
  "Las vueltas de la vida (Test)",
  "La Torre 10"
];

// Variable global para las obras (ahora apunta al array local)
let obrasData = OBRAS_DATA;
async function loadObrasData() {
  // Usar datos locales directamente (sin fetch para funcionar sin servidor)
  obrasData = OBRAS_DATA;
  console.log('Obras cargadas:', obrasData.length, 'obras');
  return Promise.resolve();
}

const episodesSection = document.getElementById("episodesSection");
const episodesMasterSelect = document.getElementById("episodesMasterSelect");
const seasonsWrap = document.getElementById("seasonsWrap");
const episodesValidation = document.getElementById("episodesValidation");

const participationsSection = document.getElementById("participationsSection");
const participationsMasterSelect = document.getElementById("participationsMasterSelect");
const participationsDefaultRows = document.getElementById("participationsDefaultRows");
const participationsGroups = document.getElementById("participationsGroups");
const participationsValidation = document.getElementById("participationsValidation");
const addDefaultParticipationBtn = document.getElementById("addDefaultParticipationBtn");
const addParticipationGroupBtn = document.getElementById("addParticipationGroupBtn");

const episodesState = new Map();
let episodesActiveMasterId = "";

const PARTICIPATION_ROLES = Object.freeze([
  "Director",
  "Guionista",
  "Autor de idea original (Guion)",
  "Autor de Obra Preexistente (Libro)",
  "Producción Original",
]);

const participationsState = new Map();
let participationsActiveMasterId = "";
let participationsGroupsUiMasterId = "";

function createInput({ type = "text", placeholder = "" } = {}) {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  return input;
}

function createSelect(options) {
  const select = document.createElement("select");
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "—";
  select.appendChild(empty);

  for (const opt of options) {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  }
  return select;
}

function clearElement(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function isMaestroOriginal(tipoObraValue) {
  return tipoObraValue === TipoObra.MaestroOriginal;
}

function supportsParticipations(tipoObraValue) {
  return tipoObraValue === TipoObra.MaestroOriginal || tipoObraValue === TipoObra.OriginalUnitario;
}

function setEnabled(element, enabled) {
  element.disabled = !enabled;
  if (!enabled) element.value = "";
}

function createLabel(text, htmlFor) {
  const label = document.createElement("label");
  label.className = "label";
  label.textContent = text;
  if (htmlFor) label.htmlFor = htmlFor;
  return label;
}

function createField({ label, control, colClass }) {
  const wrap = document.createElement("div");
  wrap.className = `field ${colClass || "col6"}`;
  const id = `f_${Math.random().toString(16).slice(2)}`;
  control.id = id;
  wrap.appendChild(createLabel(label, id));
  wrap.appendChild(control);
  return wrap;
}

function createAutocompleteInput(options, config = {}) {
  const container = document.createElement("div");
  container.className = "autocomplete-container";
  container.style.position = "relative";
  
  const input = createInput(config);
  input.classList.add("autocomplete-input");
  
  const dropdown = document.createElement("div");
  dropdown.className = "autocomplete-dropdown";
  dropdown.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 8px 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;
  
  let currentOptions = [];
  
  function filterOptions(query) {
    if (!query) return [];
    return options.filter(option => 
      option.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10); // Limitar a 10 resultados
  }
  
  function renderDropdown(items) {
    dropdown.innerHTML = '';
    if (items.length === 0) {
      dropdown.style.display = 'none';
      return;
    }
    
    items.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'autocomplete-item';
      itemEl.textContent = item;
      itemEl.style.cssText = `
        padding: 8px 12px;
        cursor: pointer;
        border-bottom: 1px solid #f0f0f0;
        transition: background-color 0.2s ease;
      `;
      
      itemEl.addEventListener('mouseenter', () => {
        itemEl.style.backgroundColor = '#f8f9fa';
      });
      
      itemEl.addEventListener('mouseleave', () => {
        itemEl.style.backgroundColor = 'white';
      });
      
      itemEl.addEventListener('click', () => {
        input.value = item;
        dropdown.style.display = 'none';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));
      });
      
      dropdown.appendChild(itemEl);
    });
    
    dropdown.style.display = 'block';
  }
  
  input.addEventListener('input', (e) => {
    const query = e.target.value;
    currentOptions = filterOptions(query);
    renderDropdown(currentOptions);
  });
  
  input.addEventListener('focus', () => {
    if (input.value) {
      currentOptions = filterOptions(input.value);
      renderDropdown(currentOptions);
    }
  });
  
  input.addEventListener('blur', () => {
    setTimeout(() => {
      dropdown.style.display = 'none';
    }, 200); // Pequeño delay para permitir clicks en dropdown
  });
  
  // Cerrar dropdown con Escape
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.style.display = 'none';
    }
  });
  
  container.appendChild(input);
  container.appendChild(dropdown);
  
  // Hacer el contenedor compatible con el acceso .value
  Object.defineProperty(container, 'value', {
    get: function() { return input.value; },
    set: function(val) { input.value = val; },
    enumerable: true
  });
  
  // Agregar event listeners compatibles
  container.addEventListener = function(event, handler) {
    input.addEventListener(event, handler);
  };
  
  // Exponer el input para compatibilidad
  container._input = input;
  
  return container;
}

function createGroup(title) {
  const group = document.createElement("section");
  group.className = "group";
  const h = document.createElement("h3");
  h.className = "groupTitle";
  h.textContent = title;
  const grid = document.createElement("div");
  grid.className = "grid";
  group.appendChild(h);
  group.appendChild(grid);
  group._grid = grid;
  return group;
}

function createTrashIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.innerHTML = '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/><path d="M10 11v6"/><path d="M14 11v6"/>';
  return svg;
}

function createCheckIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.innerHTML = '<path d="M20 6 9 17l-5-5"/>';
  return svg;
}

function createPencilIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.innerHTML = '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>';
  return svg;
}

function canSaveCard(controls) {
  const isMaestro = controls.tipoObra.value === TipoObra.MaestroOriginal;
  const hasAnyCore = controls.titulo.value.trim() !== "" || controls.codigoIda.value.trim() !== "";
  return isMaestro && hasAnyCore;
}

function setCollapsed(card, collapsed) {
  card.classList.toggle("collapsed", collapsed);
  card.dataset.collapsed = collapsed ? "1" : "0";
}

function createCard() {
  const card = document.createElement("article");
  card.className = "workCard workCardEnter";
  card.dataset.saved = "0";
  card.dataset.collapsed = "0";
  card.dataset.cardId = `m_${Math.random().toString(16).slice(2)}`;

  const codigoIda = createInput();
  const tipoObra = createSelect(SELECT_OPTIONS.tipoObra);
  const titulo = createAutocompleteInput(obrasData, { placeholder: "Nombre gramaticalmente correcto de la obra" });
  const tituloFormatoIda = createInput();
  const idioma = createInput();
  const temporadasTotales = createInput();
  const cantidadEpisodios = createInput();
  const duracionMinMax = createInput({ placeholder: "Ej. 70 / 70" });
  const formato = createSelect(SELECT_OPTIONS.formato);
  const genero = createSelect(SELECT_OPTIONS.genero);
  const sonido = createSelect(SELECT_OPTIONS.sonido);
  const color = createSelect(SELECT_OPTIONS.color);
  const caracteristicasTecnicas = createSelect(SELECT_OPTIONS.caracteristicas);
  const destino = createSelect(SELECT_OPTIONS.destino);
  const productora = createInput();
  const anioProduccion = createInput();
  const paisProduccion = createInput();

  const cardHeader = document.createElement("header");
  cardHeader.className = "cardHeader";

  const titleWrap = document.createElement("div");
  titleWrap.className = "cardTitleWrap";

  const cardTitle = document.createElement("div");
  cardTitle.className = "cardTitle";
  cardTitle.textContent = "Obra";

  const cardMeta = document.createElement("div");
  cardMeta.className = "cardMeta";
  cardMeta.textContent = "Completa lo que tengas disponible";

  titleWrap.appendChild(cardTitle);
  titleWrap.appendChild(cardMeta);

  const actionsWrap = document.createElement("div");
  actionsWrap.className = "cardActions";

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "miniBtn miniBtnPrimary";
  saveBtn.setAttribute("aria-label", "Guardar y colapsar");
  saveBtn.appendChild(createCheckIcon());
  const saveText = document.createElement("span");
  saveText.textContent = "Guardar";
  saveBtn.appendChild(saveText);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "iconBtn";
  removeBtn.setAttribute("aria-label", "Quitar obra");
  removeBtn.appendChild(createTrashIcon());

  removeBtn.addEventListener("click", () => {
    card.remove();
    ensureAtLeastOneCard();
    refreshCardTitles();
    updateEpisodesAvailability();
  });

  actionsWrap.appendChild(saveBtn);
  actionsWrap.appendChild(removeBtn);

  cardHeader.appendChild(titleWrap);
  cardHeader.appendChild(actionsWrap);

  const cardBody = document.createElement("div");
  cardBody.className = "cardBody";

  function syncConditionalFields() {
    const enabled = supportsParticipations(tipoObra.value);
    setEnabled(temporadasTotales, enabled);
    setEnabled(cantidadEpisodios, enabled);
    setEnabled(duracionMinMax, enabled);
  }

  tipoObra.addEventListener("change", () => {
    syncConditionalFields();
    updateEpisodesAvailability();
    updateParticipationsAvailability();
  });
  syncConditionalFields();

  const general = createGroup("Información general");
  general._grid.appendChild(createField({ label: FIELD_KEYS.codigoIda, control: codigoIda, colClass: "col4" }));
  general._grid.appendChild(createField({ label: FIELD_KEYS.tipoObra, control: tipoObra, colClass: "col4" }));
  general._grid.appendChild(createField({ label: FIELD_KEYS.idioma, control: idioma, colClass: "col4" }));
  general._grid.appendChild(createField({ label: FIELD_KEYS.titulo, control: titulo, colClass: "col6" }));
  general._grid.appendChild(createField({ label: FIELD_KEYS.tituloFormatoIda, control: tituloFormatoIda, colClass: "col6" }));

  const maestro = createGroup("Datos de maestro original");
  maestro._grid.appendChild(createField({ label: FIELD_KEYS.temporadasTotales, control: temporadasTotales, colClass: "col4" }));
  maestro._grid.appendChild(createField({ label: FIELD_KEYS.cantidadEpisodios, control: cantidadEpisodios, colClass: "col4" }));
  maestro._grid.appendChild(createField({ label: FIELD_KEYS.duracionMinMax, control: duracionMinMax, colClass: "col4" }));

  // Actualizar el título del grupo según el tipo de obra
  function updateMaestroGroupTitle() {
    const tipo = tipoObra.value;
    if (tipo === TipoObra.OriginalUnitario) {
      maestro.querySelector(".groupTitle").textContent = "Datos de obra unitaria";
    } else {
      maestro.querySelector(".groupTitle").textContent = "Datos de maestro original";
    }
  }

  tipoObra.addEventListener("change", () => {
    updateMaestroGroupTitle();
    updateEpisodesAvailability();
    updateParticipationsAvailability();
  });
  updateMaestroGroupTitle();

  const tech = createGroup("Especificaciones técnicas");
  tech._grid.appendChild(createField({ label: FIELD_KEYS.formato, control: formato, colClass: "col4" }));
  tech._grid.appendChild(createField({ label: FIELD_KEYS.genero, control: genero, colClass: "col4" }));
  tech._grid.appendChild(createField({ label: FIELD_KEYS.sonido, control: sonido, colClass: "col4" }));
  tech._grid.appendChild(createField({ label: FIELD_KEYS.color, control: color, colClass: "col4" }));
  tech._grid.appendChild(createField({ label: FIELD_KEYS.caracteristicasTecnicas, control: caracteristicasTecnicas, colClass: "col4" }));
  tech._grid.appendChild(createField({ label: FIELD_KEYS.destino, control: destino, colClass: "col4" }));

  const origin = createGroup("Origen");
  origin._grid.appendChild(createField({ label: FIELD_KEYS.productora, control: productora, colClass: "col6" }));
  origin._grid.appendChild(createField({ label: FIELD_KEYS.anioProduccion, control: anioProduccion, colClass: "col3" }));
  origin._grid.appendChild(createField({ label: FIELD_KEYS.paisProduccion, control: paisProduccion, colClass: "col3" }));

  cardBody.appendChild(general);
  cardBody.appendChild(maestro);
  cardBody.appendChild(tech);
  cardBody.appendChild(origin);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  card._titleEl = cardTitle;
  card._metaEl = cardMeta;
  card._saveBtn = saveBtn;
  card._saveText = saveText;
  card._controls = {
    codigoIda,
    tipoObra,
    titulo,
    tituloFormatoIda,
    idioma,
    temporadasTotales,
    cantidadEpisodios,
    duracionMinMax,
    formato,
    genero,
    sonido,
    color,
    caracteristicasTecnicas,
    destino,
    productora,
    anioProduccion,
    paisProduccion,
  };

  function updateSaveUi() {
    const saved = card.dataset.saved === "1";
    const collapsed = card.dataset.collapsed === "1";
    const allowed = canSaveCard(card._controls);

    if (saved && collapsed) {
      saveBtn.disabled = false;
      saveBtn.replaceChildren(createPencilIcon(), saveText);
      saveText.textContent = "Editar";
      saveBtn.setAttribute("aria-label", "Editar (expandir)");
    } else {
      saveBtn.disabled = !allowed;
      saveBtn.replaceChildren(createCheckIcon(), saveText);
      saveText.textContent = "Guardar";
      saveBtn.setAttribute("aria-label", "Guardar y colapsar");
    }
  }

  function markDirtyIfSaved() {
    if (card.dataset.saved === "1") {
      card.dataset.saved = "0";
      setCollapsed(card, false);
      updateSaveUi();
      refreshCardTitles();
      updateEpisodesAvailability();
    }
  }

  saveBtn.addEventListener("click", () => {
    const saved = card.dataset.saved === "1";
    const collapsed = card.dataset.collapsed === "1";
    if (saved && collapsed) {
      setCollapsed(card, false);
      card.dataset.collapsed = "0";
      updateSaveUi();
      return;
    }
    if (!canSaveCard(card._controls)) return;
    card.dataset.saved = "1";
    setCollapsed(card, true);
    updateSaveUi();
    refreshCardTitles();
  });

  for (const el of Object.values(card._controls)) {
    el.addEventListener("input", () => {
      markDirtyIfSaved();
      updateSaveUi();
      refreshCardTitles();
      updateEpisodesAvailability();
    });
    el.addEventListener("change", () => {
      markDirtyIfSaved();
      updateSaveUi();
      refreshCardTitles();
      updateEpisodesAvailability();
    });
  }

  updateSaveUi();

  window.setTimeout(() => card.classList.remove("workCardEnter"), 320);
  return card;
}

function ensureAtLeastOneCard() {
  if (worksList.children.length === 0) {
    worksList.appendChild(createCard());
    refreshCardTitles();
    updateEpisodesAvailability();
  }
}

function getCards() {
  return Array.from(worksList.querySelectorAll(".workCard"));
}

function refreshCardTitles() {
  const cards = getCards();
  cards.forEach((card, idx) => {
    const n = idx + 1;
    if (card._titleEl) card._titleEl.textContent = `Obra ${n}`;
    const tipo = card._controls?.tipoObra?.value;
    const saved = card.dataset.saved === "1";
    const collapsed = card.dataset.collapsed === "1";
    const titulo = card._controls?.titulo?.value?.trim();
    const summary = titulo ? `• ${titulo}` : "";
    if (card._metaEl) {
      if (saved && collapsed) card._metaEl.textContent = `Guardado ${tipo ? `• ${tipo}` : ""}${summary}`.trim();
      else card._metaEl.textContent = tipo ? `Tipo: ${tipo}${summary}` : "Completa lo que tengas disponible";
    }
  });
}

function parsePositiveInt(value) {
  const n = Number.parseInt(String(value).trim(), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

const MAX_EPISODE_NUMBER = 500;

function pad2(n) {
  return String(n).padStart(2, "0");
}

function pad3(n) {
  return String(n).padStart(3, "0");
}

function toIdaUpperNoAccents(text) {
  const s = String(text || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return s.toUpperCase();
}

function getSeasonEpisodesArray(seasonGroup) {
  const set = seasonGroup._selectedEpisodes || new Set();
  return Array.from(set).sort((a, b) => a - b);
}

function getTotalSelectedEpisodesForCurrentMaster() {
  const blocks = getAllSeasonBlocks();
  let total = 0;
  for (const b of blocks) total += (b._selectedEpisodes ? b._selectedEpisodes.size : 0);
  return total;
}

function setEpisodeSelected(seasonGroup, episodeNumber, selected) {
  const n = Number.parseInt(String(episodeNumber), 10);
  if (!Number.isFinite(n) || n < 1 || n > MAX_EPISODE_NUMBER) return false;

  if (!seasonGroup._selectedEpisodes) seasonGroup._selectedEpisodes = new Set();
  const has = seasonGroup._selectedEpisodes.has(n);
  if (selected && has) return false;
  if (!selected && !has) return false;

  const master = getSelectedMaster();
  if (selected && master && master.cantidadEpisodios > 0) {
    const total = getTotalSelectedEpisodesForCurrentMaster();
    if (total >= master.cantidadEpisodios) return false;
  }

  if (selected) seasonGroup._selectedEpisodes.add(n);
  else seasonGroup._selectedEpisodes.delete(n);

  const chip = seasonGroup._picker?.querySelector(`button[data-episode="${n}"]`);
  if (chip) chip.classList.toggle("selected", selected);
  return true;
}

function setSeasonEpisodes(seasonGroup, episodesArray) {
  if (!seasonGroup._selectedEpisodes) seasonGroup._selectedEpisodes = new Set();
  seasonGroup._selectedEpisodes.clear();

  const selected = [];
  for (const v of episodesArray || []) {
    const n = Number.parseInt(String(v), 10);
    if (Number.isFinite(n) && n >= 1 && n <= MAX_EPISODE_NUMBER) selected.push(n);
  }
  selected.sort((a, b) => a - b);
  for (const n of selected) seasonGroup._selectedEpisodes.add(n);

  const picker = seasonGroup._picker;
  if (!picker) return;
  const prevSelected = picker.querySelectorAll(".episodeChip.selected");
  for (const el of prevSelected) el.classList.remove("selected");
  for (const n of seasonGroup._selectedEpisodes) {
    const chip = picker.querySelector(`button[data-episode="${n}"]`);
    if (chip) chip.classList.add("selected");
  }
}

function parseParticipationPct(raw) {
  const s = String(raw || "").trim();
  if (s === "") return { ok: false, number: null, exportText: "" };
  const normalized = s.replace(",", ".");
  const n = Number.parseFloat(normalized);
  if (!Number.isFinite(n) || n <= 0 || n > 1) return { ok: false, number: null, exportText: s };
  const exportText = String(n).replace(".", ",");
  return { ok: true, number: n, exportText };
}

function isParticipationRowEmpty(row) {
  return String(row.author || "").trim() === "" && String(row.role || "").trim() === "" && String(row.pct || "").trim() === "";
}

function normalizeParticipationRowsForCompare(rows) {
  return (rows || [])
    .filter((r) => !isParticipationRowEmpty(r))
    .map((r) => {
      const author = String(r.author || "").trim();
      const role = String(r.role || "").trim();
      const pct = parseParticipationPct(r.pct);
      const pctNumber = pct.ok ? pct.number : null;
      return { author, role, pctNumber };
    });
}

function rowsAreEqual(a, b) {
  const A = normalizeParticipationRowsForCompare(a);
  const B = normalizeParticipationRowsForCompare(b);
  if (A.length !== B.length) return false;
  for (let i = 0; i < A.length; i += 1) {
    if (A[i].author !== B[i].author) return false;
    if (A[i].role !== B[i].role) return false;
    if (A[i].pctNumber !== B[i].pctNumber) return false;
  }
  return true;
}

function createParticipationRow(initial = {}) {
  const row = document.createElement("div");
  row.className = "grid";

  const author = createInput({ placeholder: "Nombre del autor participante" });
  const role = createSelect(PARTICIPATION_ROLES);
  const pct = createInput({ placeholder: "0,25" });

  author.value = initial.author || "";
  role.value = initial.role || "";
  pct.value = initial.pct || "";

  row.appendChild(createField({ label: "Autor", control: author, colClass: "col6" }));
  row.appendChild(createField({ label: "Rol", control: role, colClass: "col3" }));
  row.appendChild(createField({ label: "% Participación", control: pct, colClass: "col2" }));

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "iconBtn";
  removeBtn.setAttribute("aria-label", "Quitar participación");
  removeBtn.appendChild(createTrashIcon());

  const removeWrap = document.createElement("div");
  removeWrap.className = "field col1";
  const spacer = document.createElement("div");
  spacer.className = "label";
  spacer.textContent = "";
  removeWrap.appendChild(spacer);
  removeWrap.appendChild(removeBtn);
  row.appendChild(removeWrap);

  row._controls = { author, role, pct, removeBtn };
  return row;
}

function readParticipationRows(container) {
  const rows = Array.from(container?.querySelectorAll(".grid") || []);
  return rows.map((rowEl) => {
    const c = rowEl._controls;
    return {
      author: c?.author?.value?.trim?.() ?? "",
      role: c?.role?.value ?? "",
      pct: c?.pct?.value?.trim?.() ?? "",
    };
  });
}

function renderParticipationRows(container, rows) {
  clearElement(container);
  for (const r of rows || []) container.appendChild(createParticipationRow(r));
}

function getMasters() {
  const cards = getCards();
  const maestros = cards.filter((c) => {
    const tipo = c._controls?.tipoObra?.value;
    return tipo === TipoObra.MaestroOriginal || tipo === TipoObra.OriginalUnitario;
  });
  return maestros.map((c, idx) => {
    const titulo = c._controls.titulo.value.trim();
    const displayTitle = titulo !== "" ? titulo : `Obra ${idx + 1} (sin título)`;
    return {
      id: c.dataset.cardId,
      card: c,
      titulo,
      displayTitle,
      temporadasTotales: parsePositiveInt(c._controls.temporadasTotales.value),
      cantidadEpisodios: parsePositiveInt(c._controls.cantidadEpisodios.value),
      tipoObra: c._controls.tipoObra.value, // Agregar tipo de obra para diferenciar
    };
  });
}

function getSelectedMaster() {
  const masters = getMasters();
  const id = episodesMasterSelect?.value || "";
  return masters.find((m) => m.id === id) || null;
}

function saveCurrentMasterState(masterId = episodesActiveMasterId || episodesMasterSelect?.value || "") {
  if (!masterId) return;
  const blocks = getAllSeasonBlocks();
  const seasons = {};
  const titles = {};

  for (const block of blocks) {
    const season = block._seasonNumber;
    seasons[String(season)] = getSeasonEpisodesArray(block);
    const inputs = block._titlesWrap.querySelectorAll("input[data-season][data-episode]");
    for (const input of inputs) {
      const s = input.dataset.season;
      const e = input.dataset.episode;
      titles[`${s}-${e}`] = input.value.trim();
    }
  }

  episodesState.set(masterId, { seasons, titles });
}

function loadMasterState(masterId) {
  const state = episodesState.get(masterId);
  if (!state) return;

  const blocks = getAllSeasonBlocks();
  for (const block of blocks) {
    const season = block._seasonNumber;
    const eps = state.seasons?.[String(season)] || [];
    setSeasonEpisodes(block, eps);
    rebuildTitlesForSeason(block);

    const inputs = block._titlesWrap.querySelectorAll("input[data-season][data-episode]");
    for (const input of inputs) {
      const key = `${input.dataset.season}-${input.dataset.episode}`;
      const val = state.titles?.[key] || "";
      input.value = val;
    }
  }
}

function buildSeasonBlock(seasonNumber) {
  const group = createGroup(`Temporada ${pad2(seasonNumber)}`);

  const header = document.createElement("div");
  header.className = "seasonHeader";
  const title = document.createElement("div");
  title.className = "seasonTitle";
  title.textContent = `Temporada ${pad2(seasonNumber)}`;
  const meta = document.createElement("div");
  meta.className = "seasonMeta";
  meta.textContent = "Desliza y selecciona episodios (1–500). Arrastra para marcar rangos.";
  header.appendChild(title);
  header.appendChild(meta);
  group.insertBefore(header, group._grid);

  const picker = document.createElement("div");
  picker.className = "episodePicker";
  picker.tabIndex = 0;

  const frag = document.createDocumentFragment();
  for (let i = 1; i <= MAX_EPISODE_NUMBER; i += 1) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "episodeChip";
    chip.textContent = String(i);
    chip.dataset.episode = String(i);
    frag.appendChild(chip);
  }
  picker.appendChild(frag);

  group._grid.appendChild(createField({ label: "Episodios", control: picker, colClass: "col12" }));

  const titlesWrap = document.createElement("div");
  titlesWrap.className = "titlesWrap";
  titlesWrap.dataset.season = String(seasonNumber);
  group.appendChild(titlesWrap);

  group._picker = picker;
  group._selectedEpisodes = new Set();
  group._titlesWrap = titlesWrap;
  group._seasonNumber = seasonNumber;

  let dragging = false;
  let scrolling = false;
  let dragSelect = true;
  let dirty = false;
  let scrollStartX = 0;
  let scrollStartLeft = 0;

  function finalize() {
    if (!dirty) return;
    dirty = false;
    rebuildTitlesForSeason(group);
    updateEpisodesValidation();
  }

  picker.addEventListener("pointerdown", (e) => {
    const chip = e.target?.closest?.("button[data-episode]");
    if (!chip) {
      scrolling = true;
      scrollStartX = e.clientX;
      scrollStartLeft = picker.scrollLeft;
      picker.setPointerCapture(e.pointerId);
      return;
    }

    e.preventDefault();
    dragging = true;
    dirty = true;
    picker.classList.add("dragging");
    picker.setPointerCapture(e.pointerId);

    const ep = Number.parseInt(chip.dataset.episode, 10);
    const isSelected = group._selectedEpisodes.has(ep);
    dragSelect = !isSelected;

    setEpisodeSelected(group, ep, dragSelect);
  });

  picker.addEventListener("pointermove", (e) => {
    if (scrolling) {
      const dx = e.clientX - scrollStartX;
      picker.scrollLeft = scrollStartLeft - dx;
      return;
    }
    if (!dragging) return;

    const under = document.elementFromPoint(e.clientX, e.clientY);
    const chip = under?.closest?.("button[data-episode]");
    if (!chip || !picker.contains(chip)) return;
    const ep = Number.parseInt(chip.dataset.episode, 10);
    const changed = setEpisodeSelected(group, ep, dragSelect);
    if (changed) dirty = true;
  });

  picker.addEventListener("pointerup", (e) => {
    if (scrolling) {
      scrolling = false;
      try {
        picker.releasePointerCapture(e.pointerId);
      } catch {}
      return;
    }
    if (!dragging) return;
    dragging = false;
    picker.classList.remove("dragging");
    try {
      picker.releasePointerCapture(e.pointerId);
    } catch {}
    finalize();
  });

  picker.addEventListener("pointercancel", () => {
    if (scrolling) scrolling = false;
    if (!dragging) return;
    dragging = false;
    picker.classList.remove("dragging");
    finalize();
  });

  return group;
}

function getAllSeasonBlocks() {
  return Array.from(seasonsWrap?.querySelectorAll(".group") || []);
}

function rebuildTitlesForSeason(seasonGroup) {
  const season = seasonGroup._seasonNumber;
  const episodes = getSeasonEpisodesArray(seasonGroup);

  clearElement(seasonGroup._titlesWrap);

  for (const ep of episodes) {
    const input = createInput({ placeholder: "Título episodio" });
    input.title = "Nombre Obra - Título Episodio. Si no cuenta con el episodio, no ingrese nada.";
    input.dataset.season = String(season);
    input.dataset.episode = String(ep);

    seasonGroup._titlesWrap.appendChild(
      createField({
        label: `T${pad2(season)} • Episodio ${pad3(ep)} • Título episodio`,
        control: input,
        colClass: "col12",
      })
    );
  }
}

function rebuildSeasonsUi() {
  if (!seasonsWrap) return;
  clearElement(seasonsWrap);
  const master = getSelectedMaster();
  if (!master) return;

  const temporadas = Math.max(1, master.temporadasTotales || 0);
  for (let s = 1; s <= temporadas; s += 1) {
    seasonsWrap.appendChild(buildSeasonBlock(s));
  }
  loadMasterState(master.id);
  updateEpisodesValidation();
}

function collectEpisodes() {
  const master = getSelectedMaster();
  if (!master) return { master: null, episodes: [], totalAllowed: 0, totalSelected: 0 };

  const blocks = getAllSeasonBlocks();
  const episodes = [];

  for (const block of blocks) {
    const season = block._seasonNumber;
    const eps = getSeasonEpisodesArray(block);

    for (const ep of eps) {
      const titleInput = block._titlesWrap.querySelector(`input[data-season="${season}"][data-episode="${ep}"]`);
      const title = titleInput ? titleInput.value.trim() : "";
      episodes.push({ season, episode: ep, title });
    }
  }

  const totalAllowed = master.cantidadEpisodios || 0;
  const totalSelected = episodes.length;
  return { master, episodes, totalAllowed, totalSelected };
}

function updateEpisodesValidation() {
  if (!episodesValidation || !downloadEpisodesBtn) return;
  saveCurrentMasterState(episodesActiveMasterId);
  syncParticipationsFromEpisodesChange();
  const { master, totalAllowed, totalSelected } = collectEpisodes();

  if (!master) {
    episodesValidation.textContent = "";
    episodesValidation.classList.remove("bad");
    downloadEpisodesBtn.disabled = true;
    return;
  }

  const masters = getMasters();
  const requiredMasters = masters.filter((m) => m.cantidadEpisodios > 0);
  const missingMasters = [];
  const invalidMasters = [];

  for (const m of requiredMasters) {
    const state = episodesState.get(m.id);
    let count = 0;
    if (state?.seasons) {
      for (const eps of Object.values(state.seasons)) count += Array.isArray(eps) ? eps.length : 0;
    }
    if (count === 0) missingMasters.push(m.displayTitle);
    if (m.cantidadEpisodios > 0 && count > m.cantidadEpisodios) invalidMasters.push(m.displayTitle);
  }

  if (totalAllowed > 0 && totalSelected > totalAllowed) {
    invalidMasters.push(master.displayTitle);
  }

  if (invalidMasters.length > 0) {
    episodesValidation.textContent = `Exceso de episodios en: ${invalidMasters.join(", ")}.`;
    episodesValidation.classList.add("bad");
    downloadEpisodesBtn.disabled = true;
    return;
  }

  if (missingMasters.length > 0) {
    episodesValidation.textContent = `Faltan episodios para: ${missingMasters.join(", ")}.`;
    episodesValidation.classList.add("bad");
    downloadEpisodesBtn.disabled = true;
    return;
  }

  const allowedText = totalAllowed > 0 ? `de máximo ${totalAllowed}` : "sin máximo definido";
  episodesValidation.textContent = `Episodios definidos para "${master.displayTitle}": ${totalSelected} (${allowedText}).`;
  episodesValidation.classList.remove("bad");
  downloadEpisodesBtn.disabled = false;
}

function updateEpisodesAvailability() {
  if (!episodesSection || !episodesMasterSelect || !seasonsWrap || !episodesValidation || !downloadEpisodesBtn) return;

  saveCurrentMasterState(episodesActiveMasterId);
  const masters = getMasters();
  const hasMasters = masters.length > 0;

  // Mostrar sección de episodios solo para Maestro Original
  const selectedMaster = masters.find(m => m.id === episodesActiveMasterId);
  const isMaestroOriginalSelected = selectedMaster && selectedMaster.tipoObra === TipoObra.MaestroOriginal;
  
  episodesSection.hidden = !hasMasters || !isMaestroOriginalSelected;
  downloadEpisodesBtn.disabled = !hasMasters || !isMaestroOriginalSelected;

  if (!hasMasters) {
    clearElement(episodesMasterSelect);
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "—";
    episodesMasterSelect.appendChild(opt);
    clearElement(seasonsWrap);
    episodesValidation.textContent = "";
    episodesValidation.classList.remove("bad");
    return;
  }

  const validIds = new Set(masters.map((m) => m.id));
  for (const id of Array.from(episodesState.keys())) {
    if (!validIds.has(id)) episodesState.delete(id);
  }

  const prev = episodesMasterSelect.value;
  clearElement(episodesMasterSelect);
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "—";
  episodesMasterSelect.appendChild(empty);

  for (const m of masters) {
    const option = document.createElement("option");
    option.value = m.id;
    option.textContent = m.displayTitle;
    episodesMasterSelect.appendChild(option);
  }

  const stillExists = masters.some((m) => m.id === prev);
  episodesMasterSelect.value = stillExists ? prev : masters[0].id;
  episodesActiveMasterId = episodesMasterSelect.value;
  rebuildSeasonsUi();
  updateParticipationsAvailability();
}

function getEpisodesCountForMaster(masterId) {
  const state = episodesState.get(masterId);
  let count = 0;
  if (state?.seasons) {
    for (const eps of Object.values(state.seasons)) count += Array.isArray(eps) ? eps.length : 0;
  }
  return count;
}

function getParticipationState(masterId) {
  let state = participationsState.get(masterId);
  if (!state) {
    state = { defaultRows: [], groups: [] };
    participationsState.set(masterId, state);
  }
  if (!Array.isArray(state.groups)) state.groups = [];
  if (!Array.isArray(state.defaultRows)) state.defaultRows = [];
  return state;
}

function validateParticipationRows(rows) {
  let hasAny = false;
  let invalid = false;
  let validCount = 0;

  for (const row of rows || []) {
    if (isParticipationRowEmpty(row)) continue;
    hasAny = true;
    const author = String(row.author || "").trim();
    const role = String(row.role || "").trim();
    const pct = parseParticipationPct(row.pct);
    const roleOk = PARTICIPATION_ROLES.includes(role);
    if (author === "" || !roleOk || !pct.ok) invalid = true;
    else validCount += 1;
  }

  return { hasAny, invalid, validCount };
}

function wireParticipationRows(container, onChange) {
  const rows = Array.from(container?.querySelectorAll(".grid") || []);
  for (const rowEl of rows) {
    if (rowEl.dataset.wired === "1") continue;
    const c = rowEl._controls;
    if (!c) continue;
    const handle = () => onChange();
    c.author.addEventListener("input", handle);
    c.role.addEventListener("change", handle);
    c.pct.addEventListener("input", handle);
    c.removeBtn.addEventListener("click", () => {
      rowEl.remove();
      onChange();
    });
    rowEl.dataset.wired = "1";
  }
}

function ensureAtLeastOneRow(container) {
  if (!container) return;
  if (container.children.length > 0) return;
  container.appendChild(createParticipationRow({}));
}

function saveDefaultParticipations(masterId) {
  if (!masterId || !participationsDefaultRows) return;
  const state = getParticipationState(masterId);
  state.defaultRows = readParticipationRows(participationsDefaultRows);
}

function getSelectedParticipationMaster() {
  const masters = getMasters();
  const id = participationsMasterSelect?.value || "";
  return masters.find((m) => m.id === id) || null;
}

function getEpisodeListForMaster(masterId) {
  const state = episodesState.get(masterId);
  const list = [];
  
  // Para Original Unitario, crear un "episodio" especial que represente la obra completa
  const master = getMasters().find(m => m.id === masterId);
  if (master && master.tipoObra === TipoObra.OriginalUnitario) {
    list.push({ season: 1, episode: 1, key: "1-1", label: "Obra completa" });
    return list;
  }
  
  // Para Maestro Original, usar la lógica normal de episodios
  if (!state?.seasons) return list;
  for (const [seasonKey, eps] of Object.entries(state.seasons)) {
    const season = Number.parseInt(seasonKey, 10);
    if (!Number.isFinite(season) || season <= 0) continue;
    for (const ep of eps || []) {
      const episode = Number.parseInt(String(ep), 10);
      if (!Number.isFinite(episode) || episode <= 0) continue;
      const key = `${season}-${episode}`;
      list.push({ season, episode, key, label: `T${pad2(season)}E${pad3(episode)}` });
    }
  }
  list.sort((a, b) => (a.season - b.season) || (a.episode - b.episode));
  return list;
}

function createParticipationGroupState(name) {
  return {
    id: `pg_${Math.random().toString(16).slice(2)}`,
    name: String(name || "").trim(),
    episodeKeys: [],
    rows: [],
  };
}

function buildParticipationGroupEl(masterId, group, index) {
  const wrap = document.createElement("div");
  wrap.className = "participationGroup";
  wrap.dataset.groupId = group.id;

  const header = document.createElement("div");
  header.className = "participationGroupHeader";

  const titleWrap = document.createElement("div");
  titleWrap.className = "participationGroupTitle";
  const titleInput = createInput({ placeholder: `Personalización ${index + 1}` });
  titleInput.value = group.name || `Personalización ${index + 1}`;
  titleWrap.appendChild(titleInput);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "iconBtn";
  removeBtn.setAttribute("aria-label", "Quitar personalización");
  removeBtn.appendChild(createTrashIcon());

  header.appendChild(titleWrap);
  header.appendChild(removeBtn);

  const body = document.createElement("div");
  body.className = "participationGroupBody";

  const chips = document.createElement("div");
  chips.className = "episodePicker";
  chips.tabIndex = 0;

  const episodeList = getEpisodeListForMaster(masterId);
  const allowed = new Set(episodeList.map((x) => x.key));
  group.episodeKeys = (group.episodeKeys || []).filter((k) => allowed.has(k));

  const selected = new Set(group.episodeKeys || []);
  const frag = document.createDocumentFragment();
  for (const item of episodeList) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "episodeChip";
    chip.textContent = item.label;
    chip.dataset.episodeKey = item.key;
    chip.classList.toggle("selected", selected.has(item.key));
    chip.addEventListener("click", () => {
      if (selected.has(item.key)) selected.delete(item.key);
      else selected.add(item.key);
      group.episodeKeys = Array.from(selected);
      chip.classList.toggle("selected", selected.has(item.key));
      updateParticipationsValidation();
    });
    frag.appendChild(chip);
  }
  chips.appendChild(frag);

  const rowsWrap = document.createElement("div");
  const toRender = group.rows && group.rows.length > 0 ? group.rows : [{ author: "", role: "", pct: "" }];
  renderParticipationRows(rowsWrap, toRender);
  ensureAtLeastOneRow(rowsWrap);
  wireParticipationRows(rowsWrap, () => {
    group.rows = readParticipationRows(rowsWrap);
    updateParticipationsValidation();
  });

  const actions = document.createElement("div");
  actions.className = "rowActions";

  const addRow = document.createElement("button");
  addRow.type = "button";
  addRow.className = "miniBtn";
  addRow.textContent = "Agregar participación";

  const copyDefault = document.createElement("button");
  copyDefault.type = "button";
  copyDefault.className = "miniBtn";
  copyDefault.textContent = "Copiar desde por defecto";

  const clearSelection = document.createElement("button");
  clearSelection.type = "button";
  clearSelection.className = "miniBtn";
  clearSelection.textContent = "Limpiar episodios";

  actions.appendChild(addRow);
  actions.appendChild(copyDefault);
  actions.appendChild(clearSelection);

  addRow.addEventListener("click", () => {
    rowsWrap.appendChild(createParticipationRow({}));
    ensureAtLeastOneRow(rowsWrap);
    wireParticipationRows(rowsWrap, () => {
      group.rows = readParticipationRows(rowsWrap);
      updateParticipationsValidation();
    });
    group.rows = readParticipationRows(rowsWrap);
    updateParticipationsValidation();
  });

  copyDefault.addEventListener("click", () => {
    const state = getParticipationState(masterId);
    const base = state.defaultRows && state.defaultRows.length > 0 ? state.defaultRows : [{ author: "", role: "", pct: "" }];
    renderParticipationRows(rowsWrap, base);
    ensureAtLeastOneRow(rowsWrap);
    wireParticipationRows(rowsWrap, () => {
      group.rows = readParticipationRows(rowsWrap);
      updateParticipationsValidation();
    });
    group.rows = readParticipationRows(rowsWrap);
    updateParticipationsValidation();
  });

  clearSelection.addEventListener("click", () => {
    group.episodeKeys = [];
    const chipEls = chips.querySelectorAll(".episodeChip.selected");
    for (const el of chipEls) el.classList.remove("selected");
    selected.clear();
    updateParticipationsValidation();
  });

  titleInput.addEventListener("input", () => {
    group.name = titleInput.value.trim();
  });

  removeBtn.addEventListener("click", () => {
    const state = getParticipationState(masterId);
    state.groups = (state.groups || []).filter((g) => g.id !== group.id);
    rebuildParticipationsUi();
  });

  body.appendChild(chips);
  body.appendChild(rowsWrap);
  body.appendChild(actions);

  wrap.appendChild(header);
  wrap.appendChild(body);
  return wrap;
}

function rebuildParticipationsUi() {
  if (!participationsDefaultRows || !participationsGroups) return;
  const master = getSelectedParticipationMaster();
  if (!master) return;

  participationsGroupsUiMasterId = master.id;
  const state = getParticipationState(master.id);
  const rows = state.defaultRows && state.defaultRows.length > 0 ? state.defaultRows : [{ author: "", role: "", pct: "" }];
  renderParticipationRows(participationsDefaultRows, rows);
  ensureAtLeastOneRow(participationsDefaultRows);
  wireParticipationRows(participationsDefaultRows, () => {
    saveDefaultParticipations(master.id);
    updateParticipationsValidation();
  });

  clearElement(participationsGroups);
  const groups = state.groups || [];
  for (let i = 0; i < groups.length; i += 1) {
    participationsGroups.appendChild(buildParticipationGroupEl(master.id, groups[i], i));
  }

  updateParticipationsValidation();
}

function syncParticipationsFromEpisodesChange() {
  if (!participationsSection || participationsSection.hidden) return;
  if (!participationsActiveMasterId) return;
  if (participationsGroupsUiMasterId !== participationsActiveMasterId) return;
  rebuildParticipationsUi();
}

function updateParticipationsValidation() {
  if (!participationsValidation || !downloadParticipationsBtn) return;
  const masterId = participationsActiveMasterId || participationsMasterSelect?.value || "";
  if (masterId) saveDefaultParticipations(masterId);

  const masters = getMasters();
  const requiredMasters = masters.filter((m) => m.cantidadEpisodios > 0);
  const missingMasters = [];
  const invalidMasters = [];

  for (const m of requiredMasters) {
    const episodesCount = getEpisodesCountForMaster(m.id);
    if (episodesCount === 0) {
      missingMasters.push(m.displayTitle);
      continue;
    }

    const state = getParticipationState(m.id);
    const baseCheck = validateParticipationRows(state.defaultRows || []);
    if (!baseCheck.hasAny) missingMasters.push(m.displayTitle);
    if (baseCheck.invalid) invalidMasters.push(m.displayTitle);

    const used = new Map();
    for (const g of state.groups || []) {
      const keys = Array.isArray(g.episodeKeys) ? g.episodeKeys : [];
      if (keys.length > 0) {
        const check = validateParticipationRows(g.rows || []);
        if (!check.hasAny || check.invalid) invalidMasters.push(m.displayTitle);
      }
      for (const k of keys) used.set(k, (used.get(k) || 0) + 1);
    }
    if (Array.from(used.values()).some((n) => n > 1)) invalidMasters.push(m.displayTitle);
  }

  if (invalidMasters.length > 0) {
    participationsValidation.textContent = `Revisa participaciones en: ${Array.from(new Set(invalidMasters)).join(", ")}.`;
    participationsValidation.classList.add("bad");
    downloadParticipationsBtn.disabled = true;
    return;
  }

  if (missingMasters.length > 0) {
    participationsValidation.textContent = `Faltan participaciones o episodios para: ${Array.from(new Set(missingMasters)).join(", ")}.`;
    participationsValidation.classList.add("bad");
    downloadParticipationsBtn.disabled = true;
    return;
  }

  const current = getSelectedParticipationMaster();
  const currentEpisodes = current ? getEpisodesCountForMaster(current.id) : 0;
  participationsValidation.textContent = current
    ? `Participaciones listas para "${current.displayTitle}". Episodios a exportar: ${currentEpisodes}.`
    : "";
  participationsValidation.classList.remove("bad");
  downloadParticipationsBtn.disabled = masters.length === 0;
}

function updateParticipationsAvailability() {
  if (
    !participationsSection ||
    !participationsMasterSelect ||
    !participationsDefaultRows ||
    !participationsGroups ||
    !participationsValidation ||
    !downloadParticipationsBtn
  )
    return;

  saveDefaultParticipations(participationsActiveMasterId);
  const masters = getMasters();
  const hasMasters = masters.length > 0;

  participationsSection.hidden = !hasMasters;
  downloadParticipationsBtn.disabled = !hasMasters;

  if (!hasMasters) {
    clearElement(participationsMasterSelect);
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "—";
    participationsMasterSelect.appendChild(opt);
    clearElement(participationsDefaultRows);
    clearElement(participationsGroups);
    participationsValidation.textContent = "";
    participationsValidation.classList.remove("bad");
    participationsGroupsUiMasterId = "";
    return;
  }

  const validIds = new Set(masters.map((m) => m.id));
  for (const id of Array.from(participationsState.keys())) {
    if (!validIds.has(id)) participationsState.delete(id);
  }

  const prev = participationsMasterSelect.value;
  clearElement(participationsMasterSelect);
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "—";
  participationsMasterSelect.appendChild(empty);

  for (const m of masters) {
    const option = document.createElement("option");
    option.value = m.id;
    option.textContent = m.displayTitle;
    participationsMasterSelect.appendChild(option);
  }

  const stillExists = masters.some((m) => m.id === prev);
  participationsMasterSelect.value = stillExists ? prev : masters[0].id;
  participationsActiveMasterId = participationsMasterSelect.value;
  rebuildParticipationsUi();
}

function getEpisodeTitleForExport(master, season, episode, episodesMasterState) {
  const baseTitle = master.titulo || master.displayTitle.replace(" (sin título)", "");
  
  // Para Original Unitario, devolver solo el título de la obra
  if (master.tipoObra === TipoObra.OriginalUnitario) {
    return baseTitle;
  }
  
  // Para Maestro Original, usar el formato normal de temporada/episodio
  const defaultTitle = `${baseTitle} - T${pad2(season)}E${pad3(episode)}`;
  const customTitle = episodesMasterState?.titles?.[`${season}-${episode}`] || "";
  return customTitle !== "" ? customTitle : defaultTitle;
}

function downloadParticipationsExcel() {
  if (!window.XLSX) {
    alert("No se encontró la librería para exportar Excel. Revisa tu conexión a internet.");
    return;
  }

  saveCurrentMasterState(episodesActiveMasterId);
  saveDefaultParticipations(participationsActiveMasterId);

  const masters = getMasters();
  if (masters.length === 0) {
    alert('No hay obras con participaciones para generar.');
    return;
  }

  const requiredMasters = masters.filter((m) => m.cantidadEpisodios > 0);
  const missing = [];
  const invalid = [];

  for (const m of requiredMasters) {
    const episodesCount = getEpisodesCountForMaster(m.id);
    if (episodesCount === 0) {
      missing.push(m.displayTitle);
      continue;
    }
    const st = getParticipationState(m.id);
    const baseCheck = validateParticipationRows(st.defaultRows || []);
    if (!baseCheck.hasAny) missing.push(m.displayTitle);
    if (baseCheck.invalid) invalid.push(m.displayTitle);

    const used = new Map();
    for (const g of st.groups || []) {
      const keys = Array.isArray(g.episodeKeys) ? g.episodeKeys : [];
      if (keys.length > 0) {
        const check = validateParticipationRows(g.rows || []);
        if (!check.hasAny || check.invalid) invalid.push(m.displayTitle);
      }
      for (const k of keys) used.set(k, (used.get(k) || 0) + 1);
    }
    if (Array.from(used.values()).some((n) => n > 1)) invalid.push(m.displayTitle);
  }

  if (missing.length > 0) {
    alert(`Faltan participaciones o episodios para: ${Array.from(new Set(missing)).join(", ")}.`);
    return;
  }
  if (invalid.length > 0) {
    alert(`Revisa participaciones en: ${Array.from(new Set(invalid)).join(", ")}.`);
    return;
  }

  const records = [];
  for (const master of masters) {
    const episodesMasterState = episodesState.get(master.id);
    const episodeList = getEpisodeListForMaster(master.id);
    if (episodeList.length === 0) continue;

    const pState = getParticipationState(master.id);
    const baseRows = pState.defaultRows || [];
    const byEpisode = new Map();
    for (const g of pState.groups || []) {
      const keys = Array.isArray(g.episodeKeys) ? g.episodeKeys : [];
      for (const k of keys) byEpisode.set(k, g.rows || []);
    }

    for (const epItem of episodeList) {
      const title = getEpisodeTitleForExport(master, epItem.season, epItem.episode, episodesMasterState);
      const rows = byEpisode.get(epItem.key) || baseRows;
      for (const row of rows || []) {
        if (isParticipationRowEmpty(row)) continue;
        const pct = parseParticipationPct(row.pct);
        records.push({
          "Nombre obra*": title,
          "Nombre Socio*": String(row.author || "").trim(),
          "Roles*": String(row.role || "").trim(),
          "% Participación*": pct.ok ? pct.exportText : String(row.pct || "").trim(),
        });
      }
    }
  }

  if (records.length === 0) {
    alert("No hay participaciones para exportar.");
    return;
  }

  const headers = ["Nombre obra*", "Nombre Socio*", "Roles*", "% Participación*"];
  const worksheet = window.XLSX.utils.json_to_sheet(records, { header: headers, skipHeader: false });
  const workbook = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(workbook, worksheet, "Participaciones");

  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const filename = `formato_participaciones_${stamp}.xlsx`;
  window.XLSX.writeFile(workbook, filename);
}

function cardToRecord(card) {
  const c = card._controls;
  return {
    [FIELD_KEYS.codigoIda]: c.codigoIda.value.trim(),
    [FIELD_KEYS.tipoObra]: c.tipoObra.value,
    [FIELD_KEYS.titulo]: c.titulo.value.trim(),
    [FIELD_KEYS.tituloFormatoIda]: c.tituloFormatoIda.value.trim(),
    [FIELD_KEYS.idioma]: c.idioma.value.trim(),
    [FIELD_KEYS.temporadasTotales]: c.temporadasTotales.value.trim(),
    [FIELD_KEYS.cantidadEpisodios]: c.cantidadEpisodios.value.trim(),
    [FIELD_KEYS.duracionMinMax]: c.duracionMinMax.value.trim(),
    [FIELD_KEYS.formato]: c.formato.value,
    [FIELD_KEYS.genero]: c.genero.value,
    [FIELD_KEYS.sonido]: c.sonido.value,
    [FIELD_KEYS.color]: c.color.value,
    [FIELD_KEYS.caracteristicasTecnicas]: c.caracteristicasTecnicas.value,
    [FIELD_KEYS.destino]: c.destino.value,
    [FIELD_KEYS.productora]: c.productora.value.trim(),
    [FIELD_KEYS.anioProduccion]: c.anioProduccion.value.trim(),
    [FIELD_KEYS.paisProduccion]: c.paisProduccion.value.trim(),
  };
}

function shouldIncludeMaestroOnlyColumns(records) {
  return records.some((r) => r[FIELD_KEYS.tipoObra] === TipoObra.MaestroOriginal);
}

function buildHeaders(records) {
  const baseHeaders = [
    FIELD_KEYS.codigoIda,
    FIELD_KEYS.tipoObra,
    FIELD_KEYS.titulo,
    FIELD_KEYS.tituloFormatoIda,
    FIELD_KEYS.idioma,
  ];

  const maestroHeaders = [FIELD_KEYS.temporadasTotales, FIELD_KEYS.cantidadEpisodios, FIELD_KEYS.duracionMinMax];

  const remainingHeaders = [
    FIELD_KEYS.formato,
    FIELD_KEYS.genero,
    FIELD_KEYS.sonido,
    FIELD_KEYS.color,
    FIELD_KEYS.caracteristicasTecnicas,
    FIELD_KEYS.destino,
    FIELD_KEYS.productora,
    FIELD_KEYS.anioProduccion,
    FIELD_KEYS.paisProduccion,
  ];

  const headers = [...baseHeaders];
  if (shouldIncludeMaestroOnlyColumns(records)) headers.push(...maestroHeaders);
  headers.push(...remainingHeaders);
  return headers;
}

function normalizeRecords(records, headers) {
  return records.map((r) => {
    const normalized = {};
    for (const h of headers) normalized[h] = r[h] ?? "";
    return normalized;
  });
}

function downloadMastersExcel() {
  if (!window.XLSX) {
    alert("No se encontró la librería para exportar Excel. Revisa tu conexión a internet.");
    return;
  }

  const cards = getCards();
  const records = cards.map(cardToRecord);
  const headers = buildHeaders(records);
  const normalizedRecords = normalizeRecords(records, headers);

  const worksheet = window.XLSX.utils.json_to_sheet(normalizedRecords, { header: headers, skipHeader: false });
  const workbook = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(workbook, worksheet, "Obras");

  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(
    2,
    "0"
  )}`;
  const filename = `formato_obras_padre_${stamp}.xlsx`;

  window.XLSX.writeFile(workbook, filename);
}

function downloadEpisodesExcel() {
  if (!window.XLSX) {
    alert("No se encontró la librería para exportar Excel. Revisa tu conexión a internet.");
    return;
  }

  saveCurrentMasterState(episodesActiveMasterId);
  const masters = getMasters();
  if (masters.length === 0) {
    alert('No hay "Maestros Originales" para generar episodios.');
    return;
  }

  const requiredMasters = masters.filter((m) => m.cantidadEpisodios > 0);
  const missingMasters = [];

  for (const m of requiredMasters) {
    const state = episodesState.get(m.id);
    let count = 0;
    if (state?.seasons) {
      for (const eps of Object.values(state.seasons)) count += Array.isArray(eps) ? eps.length : 0;
    }
    if (count === 0) missingMasters.push(m.displayTitle);
    if (m.cantidadEpisodios > 0 && count > m.cantidadEpisodios) {
      alert(`Exceso de episodios en: ${m.displayTitle}.`);
      return;
    }
  }

  if (missingMasters.length > 0) {
    alert(`Faltan episodios para: ${missingMasters.join(", ")}.`);
    return;
  }

  const records = [];

  for (const master of masters) {
    const state = episodesState.get(master.id);
    if (!state?.seasons) continue;

    const m = master.card._controls;
    const baseTitle = master.titulo || master.displayTitle.replace(" (sin título)", "");

    const episodes = [];
    for (const [seasonKey, eps] of Object.entries(state.seasons)) {
      const season = Number.parseInt(seasonKey, 10);
      if (!Number.isFinite(season) || season <= 0) continue;
      for (const epNum of eps || []) {
        episodes.push({ season, episode: epNum, title: state.titles?.[`${season}-${epNum}`] || "" });
      }
    }

    episodes.sort((a, b) => (a.season - b.season) || (a.episode - b.episode));

    for (const ep of episodes) {
      const seasonText = pad2(ep.season);
      const episodeText = pad3(ep.episode);
      const defaultTitle = `${baseTitle} - T${seasonText}E${episodeText}`;
      const tituloEpisodio = ep.title !== "" ? ep.title : defaultTitle;
      records.push({
        "Tarea principal": baseTitle,
        [FIELD_KEYS.tipoObra]: TipoObra.EpisodioOriginal,
        Temporada: seasonText,
        "N° episodio": episodeText,
        "Título episodio": tituloEpisodio,
        [FIELD_KEYS.tituloFormatoIda]: toIdaUpperNoAccents(tituloEpisodio),
        [FIELD_KEYS.idioma]: m.idioma.value.trim(),
        [FIELD_KEYS.formato]: m.formato.value,
        [FIELD_KEYS.genero]: m.genero.value,
        [FIELD_KEYS.sonido]: m.sonido.value,
        [FIELD_KEYS.color]: m.color.value,
        [FIELD_KEYS.caracteristicasTecnicas]: m.caracteristicasTecnicas.value,
        [FIELD_KEYS.destino]: m.destino.value,
        [FIELD_KEYS.productora]: m.productora.value.trim(),
        [FIELD_KEYS.anioProduccion]: m.anioProduccion.value.trim(),
        [FIELD_KEYS.paisProduccion]: m.paisProduccion.value.trim(),
      });
    }
  }

  if (records.length === 0) {
    alert("No hay episodios definidos para exportar.");
    return;
  }

  const headers = [
    "Tarea principal",
    FIELD_KEYS.tipoObra,
    "Título episodio",
    FIELD_KEYS.tituloFormatoIda,
    "Temporada",
    "N° episodio",
    FIELD_KEYS.idioma,
    FIELD_KEYS.formato,
    FIELD_KEYS.genero,
    FIELD_KEYS.sonido,
    FIELD_KEYS.color,
    FIELD_KEYS.caracteristicasTecnicas,
    FIELD_KEYS.destino,
    FIELD_KEYS.productora,
    FIELD_KEYS.anioProduccion,
    FIELD_KEYS.paisProduccion,
  ];

  const worksheet = window.XLSX.utils.json_to_sheet(records, { header: headers, skipHeader: false });
  const workbook = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(workbook, worksheet, "Episodios");

  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(
    2,
    "0"
  )}`;
  const filename = `formato_episodios_${stamp}.xlsx`;

  window.XLSX.writeFile(workbook, filename);
}

function downloadAllExcel() {
  if (!window.XLSX) {
    alert("No se encontró la librería para exportar Excel. Revisa tu conexión a internet.");
    return;
  }

  saveCurrentMasterState(episodesActiveMasterId);
  saveDefaultParticipations(participationsActiveMasterId);

  const masters = getMasters();
  if (masters.length === 0) {
    alert('No hay "Maestros Originales" para generar episodios/participaciones.');
    return;
  }

  const requiredMasters = masters.filter((m) => m.cantidadEpisodios > 0);
  const missingEpisodes = [];
  for (const m of requiredMasters) {
    const state = episodesState.get(m.id);
    let count = 0;
    if (state?.seasons) {
      for (const eps of Object.values(state.seasons)) count += Array.isArray(eps) ? eps.length : 0;
    }
    if (count === 0) missingEpisodes.push(m.displayTitle);
    if (m.cantidadEpisodios > 0 && count > m.cantidadEpisodios) {
      alert(`Exceso de episodios en: ${m.displayTitle}.`);
      return;
    }
  }
  if (missingEpisodes.length > 0) {
    alert(`Faltan episodios para: ${missingEpisodes.join(", ")}.`);
    return;
  }

  const missingParts = [];
  const invalidParts = [];
  for (const m of requiredMasters) {
    const episodesCount = getEpisodesCountForMaster(m.id);
    if (episodesCount === 0) {
      missingParts.push(m.displayTitle);
      continue;
    }
    const st = getParticipationState(m.id);
    const baseCheck = validateParticipationRows(st.defaultRows || []);
    if (!baseCheck.hasAny) missingParts.push(m.displayTitle);
    if (baseCheck.invalid) invalidParts.push(m.displayTitle);

    const used = new Map();
    for (const g of st.groups || []) {
      const keys = Array.isArray(g.episodeKeys) ? g.episodeKeys : [];
      if (keys.length > 0) {
        const check = validateParticipationRows(g.rows || []);
        if (!check.hasAny || check.invalid) invalidParts.push(m.displayTitle);
      }
      for (const k of keys) used.set(k, (used.get(k) || 0) + 1);
    }
    if (Array.from(used.values()).some((n) => n > 1)) invalidParts.push(m.displayTitle);
  }
  if (missingParts.length > 0) {
    alert(`Faltan participaciones o episodios para: ${Array.from(new Set(missingParts)).join(", ")}.`);
    return;
  }
  if (invalidParts.length > 0) {
    alert(`Revisa participaciones en: ${Array.from(new Set(invalidParts)).join(", ")}.`);
    return;
  }

  const workbook = window.XLSX.utils.book_new();

  const cards = getCards();
  const mastersRecords = cards.map(cardToRecord);
  const mastersHeaders = buildHeaders(mastersRecords);
  const mastersNormalized = normalizeRecords(mastersRecords, mastersHeaders);
  const mastersWs = window.XLSX.utils.json_to_sheet(mastersNormalized, { header: mastersHeaders, skipHeader: false });
  window.XLSX.utils.book_append_sheet(workbook, mastersWs, "Obras");

  const episodesRecords = [];
  for (const master of masters) {
    const state = episodesState.get(master.id);
    if (!state?.seasons) continue;
    const m = master.card._controls;
    const baseTitle = master.titulo || master.displayTitle.replace(" (sin título)", "");
    const episodes = [];
    for (const [seasonKey, eps] of Object.entries(state.seasons)) {
      const season = Number.parseInt(seasonKey, 10);
      if (!Number.isFinite(season) || season <= 0) continue;
      for (const epNum of eps || []) {
        episodes.push({ season, episode: epNum, title: state.titles?.[`${season}-${epNum}`] || "" });
      }
    }
    episodes.sort((a, b) => (a.season - b.season) || (a.episode - b.episode));
    for (const ep of episodes) {
      const seasonText = pad2(ep.season);
      const episodeText = pad3(ep.episode);
      const defaultTitle = `${baseTitle} - T${seasonText}E${episodeText}`;
      const tituloEpisodio = ep.title !== "" ? ep.title : defaultTitle;
      episodesRecords.push({
        "Tarea principal": baseTitle,
        [FIELD_KEYS.tipoObra]: TipoObra.EpisodioOriginal,
        Temporada: seasonText,
        "N° episodio": episodeText,
        "Título episodio": tituloEpisodio,
        [FIELD_KEYS.tituloFormatoIda]: toIdaUpperNoAccents(tituloEpisodio),
        [FIELD_KEYS.idioma]: m.idioma.value.trim(),
        [FIELD_KEYS.formato]: m.formato.value,
        [FIELD_KEYS.genero]: m.genero.value,
        [FIELD_KEYS.sonido]: m.sonido.value,
        [FIELD_KEYS.color]: m.color.value,
        [FIELD_KEYS.caracteristicasTecnicas]: m.caracteristicasTecnicas.value,
        [FIELD_KEYS.destino]: m.destino.value,
        [FIELD_KEYS.productora]: m.productora.value.trim(),
        [FIELD_KEYS.anioProduccion]: m.anioProduccion.value.trim(),
        [FIELD_KEYS.paisProduccion]: m.paisProduccion.value.trim(),
      });
    }
  }
  if (episodesRecords.length === 0) {
    alert("No hay episodios definidos para exportar.");
    return;
  }
  const episodesHeaders = [
    "Tarea principal",
    FIELD_KEYS.tipoObra,
    "Título episodio",
    FIELD_KEYS.tituloFormatoIda,
    "Temporada",
    "N° episodio",
    FIELD_KEYS.idioma,
    FIELD_KEYS.formato,
    FIELD_KEYS.genero,
    FIELD_KEYS.sonido,
    FIELD_KEYS.color,
    FIELD_KEYS.caracteristicasTecnicas,
    FIELD_KEYS.destino,
    FIELD_KEYS.productora,
    FIELD_KEYS.anioProduccion,
    FIELD_KEYS.paisProduccion,
  ];
  const episodesWs = window.XLSX.utils.json_to_sheet(episodesRecords, { header: episodesHeaders, skipHeader: false });
  window.XLSX.utils.book_append_sheet(workbook, episodesWs, "Episodios");

  const partRecords = [];
  for (const master of masters) {
    const episodesMasterState = episodesState.get(master.id);
    const episodeList = getEpisodeListForMaster(master.id);
    if (episodeList.length === 0) continue;
    const pState = getParticipationState(master.id);
    const baseRows = pState.defaultRows || [];
    const byEpisode = new Map();
    for (const g of pState.groups || []) {
      const keys = Array.isArray(g.episodeKeys) ? g.episodeKeys : [];
      for (const k of keys) byEpisode.set(k, g.rows || []);
    }
    for (const epItem of episodeList) {
      const title = getEpisodeTitleForExport(master, epItem.season, epItem.episode, episodesMasterState);
      const rows = byEpisode.get(epItem.key) || baseRows;
      for (const row of rows || []) {
        if (isParticipationRowEmpty(row)) continue;
        const pct = parseParticipationPct(row.pct);
        partRecords.push({
          "Nombre obra*": title,
          "Nombre Socio*": String(row.author || "").trim(),
          "Roles*": String(row.role || "").trim(),
          "% Participación*": pct.ok ? pct.exportText : String(row.pct || "").trim(),
        });
      }
    }
  }
  if (partRecords.length === 0) {
    alert("No hay participaciones para exportar.");
    return;
  }
  const partHeaders = ["Nombre obra*", "Nombre Socio*", "Roles*", "% Participación*"];
  const partWs = window.XLSX.utils.json_to_sheet(partRecords, { header: partHeaders, skipHeader: false });
  window.XLSX.utils.book_append_sheet(workbook, partWs, "Participaciones");

  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const filename = `formatos_completos_${stamp}.xlsx`;
  window.XLSX.writeFile(workbook, filename);
}

addRowBtn.addEventListener("click", () => {
  worksList.appendChild(createCard());
  refreshCardTitles();
  updateEpisodesAvailability();
});

downloadMastersBtn.addEventListener("click", downloadMastersExcel);

downloadEpisodesBtn.addEventListener("click", downloadEpisodesExcel);

downloadParticipationsBtn?.addEventListener("click", downloadParticipationsExcel);

downloadAllBtn?.addEventListener("click", downloadAllExcel);

episodesMasterSelect?.addEventListener("change", () => {
  const newId = episodesMasterSelect.value;
  saveCurrentMasterState(episodesActiveMasterId);
  episodesActiveMasterId = newId;
  rebuildSeasonsUi();
});

participationsMasterSelect?.addEventListener("change", () => {
  const newId = participationsMasterSelect.value;
  saveDefaultParticipations(participationsActiveMasterId);
  participationsActiveMasterId = newId;
  rebuildParticipationsUi();
});

addDefaultParticipationBtn?.addEventListener("click", () => {
  if (!participationsDefaultRows) return;
  participationsDefaultRows.appendChild(createParticipationRow({}));
  ensureAtLeastOneRow(participationsDefaultRows);
  wireParticipationRows(participationsDefaultRows, () => {
    saveDefaultParticipations(participationsActiveMasterId);
    updateParticipationsValidation();
  });
  saveDefaultParticipations(participationsActiveMasterId);
  updateParticipationsValidation();
});

addParticipationGroupBtn?.addEventListener("click", () => {
  const masterId = participationsActiveMasterId || participationsMasterSelect?.value || "";
  if (!masterId) return;
  const state = getParticipationState(masterId);
  const name = `Personalización ${state.groups.length + 1}`;
  const g = createParticipationGroupState(name);
  const base = state.defaultRows && state.defaultRows.length > 0 ? state.defaultRows : [];
  g.rows = base;
  state.groups.push(g);
  rebuildParticipationsUi();
});

seasonsWrap?.addEventListener("input", (e) => {
  if (e.target && e.target.tagName === "INPUT") updateEpisodesValidation();
});

worksList.addEventListener("change", (e) => {
  if (e.target && e.target.tagName === "SELECT") refreshCardTitles();
});

// Inicializar directamente (datos ya cargados localmente)
loadObrasData();
ensureAtLeastOneCard();
updateEpisodesAvailability();
