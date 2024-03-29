const ErrorMessage = {
  BAD_REQUEST: "request가 잘못되었습니다.",
  USER_NOT_FOUND_ERR: "계정이 조회되지 않습니다.",
  DB_CONNECTION_FAIL: "DB에 연결이 실패했습니다.",
  DB_TABLE_MANAGER_FAIL: "user table 생성에 실패했습니다.",
  DB_TABLE_AUTHENTICATION_FAIL: "authentication table 생성에 실패했습니다.",
  DB_TABLE_USER_FAIL: "user table 생성에 실패했습니다.",
  NOT_AUTHENTICATE: "인증에 실패하였습니다.",
  NOT_FOUND_USER_AGENT: "user-agent 정보가 없습니다.",
  NOT_FOUND_ID: (id: string): string => `User with email ${id} not found`,
  NOT_MATCH_PASSWORD: "비밀번호가 일치하지 않습니다.",
  FAIL_SIGN_OUT: "로그아웃에 실패하였습니다.",
  EXPECTATION_FAILED: "요청 header에 정보가 있지 않습니다.",
  ACCESS_TOKEN_EXPIRED: "인증이 만료되었습니다.",
  NOT_TOKEN_USER: "비로그인 유저 입니다.",
  UPDATE_FAILED: "수정에 실패하였습니다.",
  INTERNAL_FAILED: "서버가 원활하지 않습니다. 잠시후 다시 이용해주세요.",
  NOT_FOUND_DATA: "데이터 조회에 실패하였습니다.",
  ALREADY_USER_EXIST: "이미 회원가입된 유저입니다.",
  NOT_FOUND_SNS: "sns로 부터 정보를 가져오지 못했습니다.",
  SIGN_UP_FAILED: "회원가입에 실패하였습니다.",
  KAKAO_GET_USER_FAILED: "카카오로부터 유저 정보를 받아오지 못했습니다.",
  ALREADY_SIGN_UP: "이미 가입된 회원입니다.",
  NAVER_GET_USER_FAILED: "네이버로부터 유저 정보를 받아오지 못했습니다.",
  FILE_UPLOAD_FAILED: "파일 업로드에 실패하였습니다.",
  FILE_NOT_FOUND: "해당 파일이 조회되지 않습니다.",
  SNS_SIGN_IN_FAILED: "SNS 로그인에 실패하였습니다.",
  SIGN_IN_FAILED: "로그인에 실패하였습니다.",
  SUBSCRIBE_ADD_FAILED: "구독 서비스 등록에 실패하였습니다.",
  BAD_PRODUCT_COUNT: "상품 재고가 없습니다.",
  ALREADY_PAID: "이미 결제된 상품입니다.",
  NOT_EQUAL_PRICE: "결제 금액이 다릅니다.",
  FAIL_PAYMENT: "결제에 실패하였습니다.",
  NOT_FOUND_PURCHASE: "구매 내역을 찾을 수 없습니다.",
  FAIL_SEND_EMAIL: "메일 보내기에 실패 했습니다.",
} as const;

export default ErrorMessage;
