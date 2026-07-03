/**
 * Biografías de personajes — única fuente de verdad.
 * La consumen <Parallax> (desktop), <ParallaxMobile> y el loop de index.astro,
 * que coloca el ancla de navegación (id) en un wrapper común a ambos.
 */
export interface Biografia {
  name: string;
  /** Clases CSS (`parallax--{slug}`) y nombre de los assets. */
  slug: string;
  /** Ancla de navegación (#einar-bio…) usada por Contenido.astro. */
  id: string;
  /** Extensión del asset mobile cuando no es webp. */
  ext?: "webp" | "png";
  paragraphs: string[];
}

export const biografias: Biografia[] = [
  {
    name: "Einar",
    slug: "einar",
    id: "einar-bio",
    paragraphs: [
      `<strong>Guerrero por vocación y por necesidad</strong>, entiende la disciplina como una forma de fe. Cada combate, cada herida y cada victoria son pasos hacia un mismo propósito: <strong>proteger a su hermana, Runa</strong>. Ella es el centro de su mundo, aunque rara vez lo exprese en palabras. Su lealtad no es ruidosa, pero es absoluta.`,
      `A diferencia de quienes temen el poder que Runa porta, <strong>él no lo cuestiona</strong>. Confía en ella con una certeza inquebrantable, aun cuando sabe que ese poder podría atraer fuerzas capaces de destruirlos a ambos. Si el destino exige un precio, <strong>está dispuesto a pagarlo con su propia vida</strong> antes de permitir que ella cargue sola con ese peso.`,
      `En un mundo donde los dioses observan desde la distancia y los hombres vacilan, <strong>permanece firme</strong>. No como un héroe legendario, sino como un <strong>escudo constante, silencioso, incansable</strong> y dispuesto a romperse antes que fallar.`,
    ],
  },
  {
    name: "Runa",
    slug: "runa",
    id: "runa-bio",
    paragraphs: [
      `La hechicera rúnica fue <strong>elegida por fuerzas antiguas</strong> que anteceden incluso a la fundación de Midgard. Su cuerpo es el contenedor de un <strong>poder ancestral sellado en runas vivientes</strong>, un legado prohibido que pocos conocen y que ella misma apenas comprende del todo. Este don, tan vasto como peligroso, la obliga a caminar siempre en el delicado equilibrio entre el orden y la destrucción.`,
      `Más allá de su rol como núcleo energético y protectora de Midgard, su vínculo más fuerte es con su hermano, Einar. Él es su <strong>ancla a la humanidad</strong>, la razón por la que reprime el poder que arde en su interior. Cuidarlo no es solo una promesa de sangre, sino el último hilo que la separa de convertirse en aquello que las runas susurran que podría ser.`,
      `Mientras el mundo avanza hacia un destino incierto, ella permanece en guardia, consciente de que el verdadero peligro no siempre llega desde afuera… sino desde el <strong>poder que duerme dentro de sí misma</strong>.`,
    ],
  },
  {
    name: "Stalker",
    slug: "stalker",
    id: "stalker-bio",
    paragraphs: [
      `Camina entre los vivos y los caídos, una <strong>sombra consciente que no pertenece por completo a ningún reino</strong>. Su forma es inestable, como si la muerte nunca hubiera terminado de reclamarlo y la vida lo rechazara por igual. Nadie conoce su verdadero origen ni el propósito que lo guía.`,
      `No deja huellas, no pronuncia juramentos y jamás explica sus actos. Solo una verdad es incuestionable: <strong>sirve a su reina, Hel</strong>. Su voluntad no le pertenece; es una extensión del dominio de la Señora de los Muertos. Quienes han cruzado su mirada aseguran haber sentido cómo sus recuerdos más oscuros eran examinados, como si el propio <strong>umbral de la muerte</strong> los estuviera evaluando.`,
      `No busca gloria, ni venganza, ni redención. Mientras Hel reine sobre las almas, <strong>continuará su marcha silenciosa</strong>, recordándole a los vivos que la frontera entre los mundos es más frágil de lo que creen.`,
    ],
  },
  {
    name: "Hel",
    slug: "hel",
    id: "hel-bio",
    paragraphs: [
      `<strong>No fue coronada</strong>; el dominio de las almas le pertenece por naturaleza. Gobierna con una <strong>calma aterradora</strong>, sin gritos ni caprichos, sin ceder jamás a las emociones que agitan a los mortales. Cada alma caída es juzgada y confinada bajo reglas que solo ella comprende. En su reino no hay súplicas ni redención fácil: <strong>la muerte no es un final, sino una sentencia</strong> administrada con precisión absoluta.`,
      `Para algunos es una diosa; para otros, una <strong>maldición inevitable</strong>. No reclama adoración ni teme al olvido.`,
    ],
  },
  {
    name: "Moder",
    slug: "moder",
    id: "moder-bio",
    paragraphs: [
      `Antes de que los hombres nombraran a los dioses, su <strong>hielo y su aliento</strong> ya habían dado forma al mundo. De ella descienden los <strong>linajes dracónicos</strong>, portadores de poder, memoria y destrucción.`,
      `Antiguamente reinó en <strong>Nidafjöll</strong>, cuna de los dragones y montaña sagrada donde el tiempo parecía detenido. Sin embargo, su grandeza se volvió motivo de temor. Las mismas fuerzas que alguna vez la veneraron decidieron <strong>desterrarla</strong>, temiendo el alcance de su poder y la libertad que representaba. Su exilio no fue una derrota, sino <strong>una herida que el mundo aún no termina de pagar</strong>.`,
    ],
  },
  {
    name: "Fader",
    slug: "fader",
    id: "fader-bio",
    ext: "png",
    paragraphs: [
      `Fue llamado <strong>padre antes de ser llamado monstruo</strong>. Su existencia precede a muchos de los pactos que hoy sostienen a Midgard, y su influencia fue tan profunda que incluso los dioses temieron aquello que había creado.`,
      `Por eso, <strong>no lo mataron. Lo borraron.</strong> Su nombre fue arrancado de las runas, de las canciones y de la memoria divina. Condenado al bioma más infernal de Midgard, existe en un lugar donde la tierra quema, el aire corrompe y el tiempo se distorsiona. Allí no hay redención ni muerte verdadera, solo una <strong>eternidad de furia contenida</strong>. Cada latido del mundo resuena como un recordatorio de lo que le fue arrebatado.`,
    ],
  },
];
