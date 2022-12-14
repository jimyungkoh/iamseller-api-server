# [π iamseller api server out now! π](https://iamseller-api-server-jajtf.ondigitalocean.app/api-docs)

## κΈ°μ  μ€νκ³Ό λΈλμΉ μ λ΅

![iamseller_main](https://user-images.githubusercontent.com/30682847/190291861-a309111c-b321-4c50-ba0f-8485b9b9e772.png)

## ERD

![erd](https://user-images.githubusercontent.com/30682847/190328676-be9ed859-bb36-4eb5-8705-ff6285c24d5d.png)

## νλ‘μ νΈ νΉμ§
- [μ’μ κ°λ° μ΅κ΄μ κ°μ§λ € λΆλ¨ν λΈλ ₯νμμ΅λλ€ π¦](https://github.com/users/jimyungkoh/projects/6)
  ![branch](https://user-images.githubusercontent.com/30682847/190297513-b9a04ebd-1676-4c69-bead-e743379ccbd2.png)
- μ-λ¬λ¬ νμ¨μ κ°μ Έμμ λ°°μ‘λΉλ₯Ό μ μ©ν©λλ€!
  - νμ¨ apiλ 'νκ΅­μμΆμμν νμ¨ μ λ³΄' μ΄μ©
  - API νΈμΆμ΄ μΌ 1,000νμ΄κΈ° λλ¬Έμ κ°μ λ μ§μ νμ¨ λ°μ΄ν°κ° DBμ μλ κ²½μ° μ¬νμ© 
  - λΉμμμΌμ λ°μ΄ν°, μμλΉμΌ 11μ μ΄μ μ ν΄λΉμΌμ λ°μ΄ν°λ₯Ό μμ²­ν  κ²½μ° null κ°μ΄ λ°νλλλ°, μ΄ κ²½μ° κ°μ₯ μ΅κ·Ό νμ¨ μ μ©
- μ μ°ν μΏ ν° μμ€ν
  - μΏ ν°μ νμ(μ λ₯ /μ μ‘/λ°°μ‘λΉ)μΌλ‘ νλ² λλκ³ ! international / national λ‘ λλ² λλμμ΅λλ€!
  - μΏ ν° νμμ λ§λ 'μμ ν(ν΄μΈ μ£Όλ¬ΈμΈ κ²½μ°, κ΅­λ΄ μΏ ν° μ μ© β λμ°λ μ±λ¦½)' ν μΈ κΈμ‘μ μ κ³΅ν©λλ€.
  - μΏ ν°λ§λ€ μ΄μ κΉμ§ μΌλ§λ§νΌ ν μΈμ΄ λμλμ§, μ¬μ©νλμ§, λ¨μλμ§ μΆμ ν  μ μμ΅λλ€! π
- μ΅μ  λ²μ μ swagger doc μ μ© β
- Digital Oceanμ μ΄μ©ν CI/CD π³
  - λ³Έ λ¦¬ν¬μ§ν λ¦¬μ master λΈλμΉμ λ²μ μ΄ μ¬λΌκ°λ©΄, μλμΌλ‘ ν΅ν© & λ°°ν¬κ° λ©λλ€.
- ESLint & Prettier β¨
  - ν΅μΌλ μ½λ μ€νμΌμ κ°μ ν©λλ€.
## μκ΅¬μ¬ν­κ³Ό κ΅¬ν 

- λͺ¨λ  μ¬λ¬ κ±΄ μ‘°ν κΈ°λ₯μλ νμ΄μ§λ€μ΄μμ΄ μ μ©λμμ΅λλ€ π
- μ ν μ£Όλ¬Έ λ΄μ­ μ΄λ β
  ![findOrders](https://user-images.githubusercontent.com/30682847/190298183-75f54cd5-be1e-4090-b97b-7451092a6efd.png)
- μ£Όλ¬Έ λ΄μ­ κ²μ β
  ![findOne](https://user-images.githubusercontent.com/30682847/190298368-fb9d89c3-df78-4827-a606-ae852222187b.png)
- μ£Όλ¬ΈμλͺμΌλ‘ κ²μ β
  ![findByUserName](https://user-images.githubusercontent.com/30682847/190299416-041964ff-4374-42d0-a3af-a1022af4bbb1.png)
- μ£Όλ¬Έκ±΄μ λνμ¬ λ°μ‘ μ²λ¦¬ β
  ![updateStatus](https://user-images.githubusercontent.com/30682847/190299926-e580d0ff-4388-4c27-b73f-757f98e34d13.png)
- μΏ ν° κ΄λ¦¬ β (CRUDλ‘ κ΅¬ν)
  ![couponCRUD](https://user-images.githubusercontent.com/30682847/190300079-a6336ff9-bd4a-434f-b25a-15a4a3aa5f9b.png)
- μλ‘μ΄ μΏ ν° νμ μ μ€ β
  ```typescript
  export const CouponType = {
    fixed: 'fixed',
    rate: 'rate',
    delivery: 'delivery',
  };
  ```
- νΉμ  μ κ· μΏ ν° μ½λ λ°κΈ β
![createCoupon](https://user-images.githubusercontent.com/30682847/190302078-3cf9e49d-80fd-4857-8955-a58cdbabf360.png)
- λ°κΈλ μΏ ν°μ μ¬μ© λ΄μ­ μ΄λ & μΏ ν° νμ λ³ μ¬μ© νμ & μ΄ ν μΈμ‘ β
![findOneCoupon](https://user-images.githubusercontent.com/30682847/190302376-56d28038-b076-4abd-911f-a7470f90d074.png)
- μ ν λ°°μ‘ μν μλ°μ΄νΈ β
  - μ νμ λ°°μ‘ μνλ₯Ό λ°°μ‘ μ€, λ°°μ‘ μλ£ λ±μΌλ‘ μμ  κ°λ₯
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

- Author - [Kamil MyΕliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
