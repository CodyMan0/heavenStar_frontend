export default class HTTPError extends Error {
  constructor(public statusCode: number, public message: string) {
    console.log('t',message)
    super(message);
  }
  get errorMessage() {
    switch (this.statusCode) {
      case 400:
        this.message = '유효하지 않은 이메일 혹은 비밀번호입니다.';
        break;
      default:
        throw new Error('Unknown Error');
    }

    console.log(this.message)
    return this.message;
  }
}
