export const COLORS = {
  PRIMARY: 'var(--color-primary)',
  BLACK: 'var(--color-black)',
  DARKEST_GRAY: 'var(--color-darkest-gray)',
  DARK_GRAY: 'var(--color-dark-gray)',
  LIGHT_GRAY: 'var(--color-light-gray)',
  LIGHTEST_GRAY: 'var(--color-lightest-gray)',
};

const baseUrl = import.meta.env.VITE_BASE_URL || '';

export const PATH = {
  SIGNIN: `${baseUrl}/signin`,
  HOME: `${baseUrl}/`,
  ANNOUNCEMENT: `${baseUrl}/announcements/:id`,
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
};
