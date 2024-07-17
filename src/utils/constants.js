// constant의 경우 utils 하위에 두는 것보단, constants 하위에 두는 것이 더 의미론적으로 맞다고 생각합니다.
// utils라는 것은 의미적으로 어떤 기능을 수행하는 함수의 집합이라고 생각합니다. 또는 프로젝트에서 사용되는 프로젝트만의 라이브러리라고 할 수 있겠네요.

// constants, policy, ...
export const COLORS = {
  PRIMARY: 'var(--color-primary)',
  BLACK: 'var(--color-black)',
  DARKEST_GRAY: 'var(--color-darkest-gray)',
  DARK_GRAY: 'var(--color-dark-gray)',
  LIGHT_GRAY: 'var(--color-light-gray)',
  LIGHTEST_GRAY: 'var(--color-lightest-gray)',
};

const baseUrl = import.meta.env.VITE_BASE_URL || ''; // 상수도 사용처가 여러곳으로 파편화 되어있던데, 하나의 파일로 모아서 관리하는 것이 좋습니다. 그 이유는 상수가 변경되었을 때, 변경된 상수를 찾아서 수정해야 하는 번거로움을 줄일 수 있기 때문입니다.

export const PATH = {
  SIGNIN: `${baseUrl}/signin`,
  HOME: `${baseUrl}/`,
  ANNOUNCEMENT: `${baseUrl}/announcements/:id`,
  ANNOUNCEMENTS: `${baseUrl}/announcements`,
  MEMBER: `${baseUrl}/members/:id`,
  MEMBERS: `${baseUrl}/members`,
  PROFILE: `${baseUrl}/profile`,
  WORK_MANAGE: `${baseUrl}/work-manage`,
};

export const PATH_TITLE = {
  SIGNIN: '로그인',
  HOME: '홈',
  MEMBERS: '구성원',
  PROFILE: '프로필',
  WORK_MANAGE: '근무/휴가',
  ANNOUNCEMENT: '공지사항',
};
