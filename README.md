# [🌊 iamseller api server out now! 🌊](https://iamseller-api-server-jajtf.ondigitalocean.app/api-docs)

## 기술 스택과 브랜치 전략

![iamseller_main](https://user-images.githubusercontent.com/30682847/190291861-a309111c-b321-4c50-ba0f-8485b9b9e772.png)

## ERD

![erd](https://user-images.githubusercontent.com/30682847/190328676-be9ed859-bb36-4eb5-8705-ff6285c24d5d.png)

## 프로젝트 특징
- [좋은 개발 습관을 가지려 부단히 노력하였습니다 💦](https://github.com/users/jimyungkoh/projects/6)
  ![branch](https://user-images.githubusercontent.com/30682847/190297513-b9a04ebd-1676-4c69-bead-e743379ccbd2.png)
- 원-달러 환율을 가져와서 배송비를 적용합니다!
  - 환율 api는 '한국수출입은행 환율 정보' 이용
  - API 호출이 일 1,000회이기 때문에 같은 날짜의 환율 데이터가 DB에 있는 경우 재활용 
  - 비영업일의 데이터, 영업당일 11시 이전에 해당일의 데이터를 요청할 경우 null 값이 반환되는데, 이 경우 가장 최근 환율 적용
- 유연한 쿠폰 시스템
  - 쿠폰을 타입(정률/정액/배송비)으로 한번 나누고! international / national 로 두번 나누었습니다!
  - 쿠폰 타입에 맞는 '안전한(해외 주문인 경우, 국내 쿠폰 적용 ❌ 대우도 성립)' 할인 금액을 제공합니다.
  - 쿠폰마다 이제까지 얼마만큼 할인이 되었는지, 사용했는지, 남았는지 추적할 수 있습니다! 🚀
- 최신 버전의 swagger doc 적용 ✅
- Digital Ocean을 이용한 CI/CD 🐳
  - 본 리포지토리의 master 브랜치에 버전이 올라가면, 자동으로 통합 & 배포가 됩니다.
- ESLint & Prettier ✨
  - 통일된 코드 스타일을 강제합니다.
## 요구사항과 구현 

- 모든 여러 건 조회 기능에는 페이지네이션이 적용되었습니다 🎈
- 제품 주문 내역 열람 ✅
  ![findOrders](https://user-images.githubusercontent.com/30682847/190298183-75f54cd5-be1e-4090-b97b-7451092a6efd.png)
- 주문 내역 검색 ✅
  ![findOne](https://user-images.githubusercontent.com/30682847/190298368-fb9d89c3-df78-4827-a606-ae852222187b.png)
- 주문자명으로 검색 ✅
  ![findByUserName](https://user-images.githubusercontent.com/30682847/190299416-041964ff-4374-42d0-a3af-a1022af4bbb1.png)
- 주문건에 대하여 발송 처리 ✅
  ![updateStatus](https://user-images.githubusercontent.com/30682847/190299926-e580d0ff-4388-4c27-b73f-757f98e34d13.png)
- 쿠폰 관리 ✅ (CRUD로 구현)
  ![couponCRUD](https://user-images.githubusercontent.com/30682847/190300079-a6336ff9-bd4a-434f-b25a-15a4a3aa5f9b.png)
- 새로운 쿠폰 타입 신설 ✅
  ```typescript
  export const CouponType = {
    fixed: 'fixed',
    rate: 'rate',
    delivery: 'delivery',
  };
  ```
- 특정 신규 쿠폰 코드 발급 ✅
![createCoupon](https://user-images.githubusercontent.com/30682847/190302078-3cf9e49d-80fd-4857-8955-a58cdbabf360.png)
- 발급된 쿠폰의 사용 내역 열람 & 쿠폰 타입 별 사용 횟수 & 총 할인액 ✅
![findOneCoupon](https://user-images.githubusercontent.com/30682847/190302376-56d28038-b076-4abd-911f-a7470f90d074.png)
- 제품 배송 상태 업데이트 ✅
  - 제품의 배송 상태를 배송 중, 배송 완료 등으로 수정 가능
![changeOrderStatue](https://user-images.githubusercontent.com/30682847/190302622-1c8a268d-c07e-4e48-b3e1-32e85a92e9c1.png)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
