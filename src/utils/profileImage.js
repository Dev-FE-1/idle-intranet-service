const SEEDS = [
  'Peanut',
  'Callie',
  'Abby',
  'Lucy',
  'Angel',
  'Bella',
  'Salem',
  'Gizmo',
  'Leo',
  'Sasha',
  'Cali',
  'Boo',
  'Smokey',
  'Jasper',
  'Coco',
  'Annie',
  'Max',
  'Boots',
  'Bear',
  'Kiki',
];
const EYES_VARIANTS = 24;
const HAIR_VARIANTS = 48;
const EYEBROWS_VARIANTS = 13;
const GLASSES_VARIANTS = 5;
const PROFILE_IMAGE_BASE_URL = 'https://api.dicebear.com/9.x/lorelei/svg';

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function generateRandomProfile() {
  const randomSeed = SEEDS[Math.floor(Math.random() * SEEDS.length)];
  const randomEyes = `${String(getRandomNumber(EYES_VARIANTS)).padStart(2, '0')}`;
  const randomHair = `${String(getRandomNumber(HAIR_VARIANTS)).padStart(2, '0')}`;
  const randomEyebrows = `${String(getRandomNumber(EYEBROWS_VARIANTS)).padStart(2, '0')}`;

  let randomGlasses = '';
  if (Math.random() < 0.3) {
    randomGlasses = `&glasses=variant${String(getRandomNumber(GLASSES_VARIANTS)).padStart(2, '0')}`;
  }

  return `${PROFILE_IMAGE_BASE_URL}?seed=${randomSeed}&eyes=variant${randomEyes}&hair=variant${randomHair}&eyebrows=variant${randomEyebrows}${randomGlasses}`;
}

export { generateRandomProfile };
