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
const PROFILE_IMAGE_BASE_URL = 'https://api.dicebear.com/9.x/lorelei/svg';

function generateRandomProfile() {
  const randomSeed = SEEDS[Math.floor(Math.random() * SEEDS.length)];
  const randomEyes = `${String(Math.floor(Math.random() * EYES_VARIANTS) + 1).padStart(2, '0')}`;

  return `${PROFILE_IMAGE_BASE_URL}?seed=${randomSeed}&eyes=variant${randomEyes}`;
}

export { generateRandomProfile };
