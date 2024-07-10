export class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

export function handleAPIError(error) {
  if (error.response) {
    // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
    throw new APIError(
      error.response.data.message || '서버 에러가 발생했습니다.',
      error.response.status,
    );
  } else if (error.request) {
    // 요청이 이루어졌으나 응답을 받지 못한 경우
    throw new APIError('서버로부터 응답을 받지 못했습니다.', 0);
  } else {
    // 요청 설정 중에 오류가 발생한 경우
    throw new APIError('요청 설정 중 오류가 발생했습니다.', 0);
  }
}
