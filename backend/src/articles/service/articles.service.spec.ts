import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { ArticlesRepository } from '../repository/articles.repository';
import { mockArticle, mockArticleCreate } from '../mock/articles-service.mock';

describe('ArticlesService', () => {
  let service: ArticlesService;

  const mockRepo = {
    findAll: jest.fn(),
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

  describe('Test for findArticles', () => {
    it('should return a list of articles when found', async () => {
      mockRepo.findAll.mockReturnValueOnce([mockArticle]);

      const result = await service.findArticles();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(mockRepo.findAll).toHaveBeenCalled();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should throw NotFoundException when no articles exist', async () => {
      mockRepo.findAll.mockReturnValueOnce([]);

      try {
        await service.findArticles();
      } catch (error) {
        expect(error).toBeDefined();
        expect(mockRepo.findAll).toHaveBeenCalled();
        expect(error.message).toBe('No articles found');
      }
    });
  });

  describe('Test for findArticle', () => {
    it('should return article when objectID exists', async () => {
      mockRepo.findOne.mockReturnValueOnce(mockArticle);

      const result = await service.findArticle(mockArticle.objectID);

      expect(result).toBeDefined();
      expect(result).toMatchObject(mockArticle);
      expect(mockRepo.findOne).toHaveBeenCalled();
    });

    it('should throw NotFoundException when article with objectID does not exist', async () => {
      try {
        await service.findArticle('1111');
      } catch (error) {
        expect(mockRepo.findOne).toHaveBeenCalled();
        expect(error).toBeDefined();
        expect(error.message).toBe(`Article #1111 not found`);
      }
    });
  });

  describe('Test for createArticle', () => {
    it('should create article successfully when objectID does not exist', async () => {
      mockRepo.create.mockReturnValueOnce(mockArticleCreate);

      const result = await service.createArticle(mockArticleCreate);

      expect(result).toBeDefined();
      expect(result).toMatchObject(mockArticleCreate);
      expect(mockRepo.findOne).toHaveBeenCalled();
      expect(mockRepo.create).toHaveBeenCalled();
    });

    it('should throw ConflictException when article with objectID already exists', async () => {
      try {
        await service.createArticle(mockArticleCreate);
      } catch (error) {
        expect(mockRepo.findOne).toHaveBeenCalled();
        expect(error).toBeDefined();
        expect(error.message).toBe(
          `Article #${mockArticleCreate.objectID} already exists`,
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
      expect(mockRepo.findOne).toHaveBeenCalled();
      expect(mockRepo.softdelete).toHaveBeenCalled();
    });

    it('should throw NotFoundException when article with objectID does not exist', async () => {
      try {
        await service.deleteArticle(mockArticle.objectID);
      } catch (error) {
        expect(mockRepo.findOne).toHaveBeenCalled();
        expect(error).toBeDefined();
        expect(error.message).toBe(
          `Article #${mockArticle.objectID} not found`,
        );
      }
    });
  });
});
