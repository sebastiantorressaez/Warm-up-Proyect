import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { ArticlesRepository } from '../repository/articles.repository';
import {
  mockArticle,
  mockCreateArticleDto,
} from '../mock/articles-service.mock';

describe('ArticlesService', () => {
  let service: ArticlesService;

  const mockRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    softdelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        { provide: ArticlesRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Test for findArticle', () => {
    it('should return article when objectID exists', async () => {
      mockRepo.findOne.mockReturnValueOnce(mockArticle);

      const result = await service.findArticle(mockArticle.objectID);

      expect(result).toBeDefined();
      expect(result).toMatchObject(mockArticle);
      expect(mockRepo.findOne).toBeCalled();
    });

    it('should throw NotFoundException when article with objectID does not exist', async () => {
      try {
        await service.findArticle('1111');
      } catch (error) {
        expect(mockRepo.findOne).toBeCalled();
        expect(error).toBeDefined();
        expect(error.message).toBe(`Article #1111 not found`);
      }
    });
  });

  describe('Test for createArticle', () => {
    it('should create article successfully when objectID does not exist', async () => {
      mockRepo.create.mockReturnValueOnce(mockCreateArticleDto);

      const result = await service.createArticle(mockCreateArticleDto);

      expect(result).toBeDefined();
      expect(result).toMatchObject(mockCreateArticleDto);
      expect(mockRepo.findOne).toBeCalled();
      expect(mockRepo.create).toBeCalled();
    });

    it('should throw ConflictException when article with objectID already exists', async () => {
      try {
        await service.createArticle(mockCreateArticleDto);
      } catch (error) {
        expect(mockRepo.findOne).toBeCalled();
        expect(error).toBeDefined();
        expect(error.message).toBe(
          `Article #${mockCreateArticleDto.objectID} already exists`,
        );
      }
    });
  });

  describe('Test for deleteArticle', () => {
    it('should delete article successfully when objectID exists', async () => {
      mockRepo.findOne.mockReturnValueOnce(mockArticle);
      mockRepo.softdelete.mockReturnValueOnce(mockArticle);

      const result = await service.deleteArticle(mockArticle.objectID);

      expect(result).toBeDefined();
      expect(result).toMatchObject(mockArticle);
      expect(mockRepo.findOne).toBeCalled();
      expect(mockRepo.softdelete).toBeCalled();
    });

    it('should throw NotFoundException when article with objectID does not exist', async () => {
      try {
        await service.deleteArticle(mockArticle.objectID);
      } catch (error) {
        expect(mockRepo.findOne).toBeCalled();
        expect(error).toBeDefined();
        expect(error.message).toBe(
          `Article #${mockArticle.objectID} not found`,
        );
      }
    });
  });
});
