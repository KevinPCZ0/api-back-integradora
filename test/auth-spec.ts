import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";

describe("Acceder al perfil de usuario", () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST /users`, async () => {
    const userTest = {
      username: process.env.TEST_USER,
      password: process.env.TEST_PWD,
    };

    return request(app.getHttpServer())
      .post("/auth/login")
      .send(userTest)
      .expect(401);
  });

  it(`/GET auth/profile`, () => {
    return request(app.getHttpServer()).get("/auth/profile").expect(401);
  });

  it(`/GET auth/profile`, async () => {
    return request(app.getHttpServer())
      .get("/auth/profile")
      .set("Authorization", `Bearer ${process.env.TOKEN}`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
