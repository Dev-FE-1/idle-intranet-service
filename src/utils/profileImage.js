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

// 화살표 함수를 사용한다면 return을 생략할 수 있습니다.
// const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;
function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

const getRandomSeed = () => {
  const [randomSeed] = [...SEEDS].sort(() => Math.random() - 0.5); // 스프레드로 복사하는 이유는 원본 배열을 변경하지 않기 위해서입니다. 원본 배열이 변경되어도 상관 없는 지금과 같은 경우에는 생략해도 되지만, 나중에 SEED 배열이 그 자체로 사용될 수 있기에.
  return randomSeed;
};

function generateRandomProfile() {
  const randomSeed = SEEDS[Math.floor(Math.random() * SEEDS.length)]; // 랜덤한 요소를 가져오고 싶다면 sort(() => Math.random() - 0.5 )를 사용해 구현할 수도 있겠네요.

  const randomEyes = `${String(getRandomNumber(EYES_VARIANTS)).padStart(2, '0')}`; // 반복되는 로직은 함수로 분리하는 것이 좋습니다.
  const randomHair = `${String(getRandomNumber(HAIR_VARIANTS)).padStart(2, '0')}`;
  const randomEyebrows = `${String(getRandomNumber(EYEBROWS_VARIANTS)).padStart(2, '0')}`;

  // 반환 값이 필요하다면, 삼항 연산자를 사용하는 것을 추천합니다.
  // const randomGlasses = Math.random() < 0.3 ? `&glasses=variant${String(getRandomNumber(GLASSES_VARIANTS)).padStart(2, '0')}` : '';

  let randomGlasses = '';
  if (Math.random() < 0.3) {
    randomGlasses = `&glasses=variant${String(getRandomNumber(GLASSES_VARIANTS)).padStart(2, '0')}`;
  }

  return `${PROFILE_IMAGE_BASE_URL}?seed=${randomSeed}&eyes=variant${randomEyes}&hair=variant${randomHair}&eyebrows=variant${randomEyebrows}${randomGlasses}`;
}

export { generateRandomProfile }; // 왜 이렇게 export를 하였는지?
