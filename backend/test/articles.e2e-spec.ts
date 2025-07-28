import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { Article, ArticleSchema } from '../src/articles/schema/article.schema';
import { ArticlesService } from '../src/articles/service/articles.service';
import { getModelToken } from '@nestjs/mongoose';
import { ArticlesRepository } from '../src/articles/repository/articles.repository';
import {
  mockArticle,
  mockArticleCreate,
} from '../src/articles/mock/articles-service.mock';
import { ConfigModule } from '@nestjs/config';
import { ArticlesController } from '../src/articles/controller/articles.controller';

describe('Articles (e2e)', () => {
  let app: INestApplication<App>;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let articleModel: Model<Article>;
  let service: ArticlesService;
  let repository: ArticlesRepository;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    articleModel = mongoConnection.model(Article.name, ArticleSchema);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [ArticlesController],
      providers: [
        ArticlesService,
        ArticlesRepository,
        { provide: getModelToken(Article.name), useValue: articleModel },
      ],
    }).compile();

    service = moduleFixture.get<ArticlesService>(ArticlesService);
    repository = moduleFixture.get<ArticlesRepository>(ArticlesRepository);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('Find all articles [GET /]', async () => {
    await articleModel.create([mockArticleCreate]);

    return request(app.getHttpServer())
      .get('/articles')
      .expect(200)
      .expect([mockArticle]);
  });

  it('Find one article [GET /:objectID]', async () => {
    await articleModel.create(mockArticleCreate);

    return request(app.getHttpServer())
      .get(`/articles/${mockArticle.objectID}`)
      .expect(200)
      .expect(mockArticle);
  });

  it('Create article [POST /]', async () => {
    return request(app.getHttpServer())
      .post('/articles')
      .expect(201)
      .send(mockArticleCreate);
  });

  it('Delete article [DELETE /:objectID]', async () => {
    await articleModel.create(mockArticleCreate);

    return request(app.getHttpServer())
      .delete(`/articles/${mockArticle.objectID}`)
      .expect(200);
  });
});
