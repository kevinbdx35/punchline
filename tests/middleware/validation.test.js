const { validateQuote, validatePagination } = require('../../middleware/validation');

describe('Validation Middleware', () => {
  let mockRequest, mockResponse, mockNext;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    mockNext = jest.fn();
  });

  describe('validateQuote', () => {
    test('should validate valid quote data', () => {
      mockRequest.body = {
        lang: 'en',
        quote: 'This is a valid quote for testing purposes',
        author: 'Test Author'
      };

      validateQuote(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.body).toEqual({
        lang: 'en',
        quote: 'This is a valid quote for testing purposes',
        author: 'Test Author'
      });
    });

    test('should reject empty quote', () => {
      mockRequest.body = {
        lang: 'en',
        quote: '',
        author: 'Test Author'
      };

      validateQuote(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      const error = mockNext.mock.calls[0][0];
      expect(error.statusCode).toBe(400);
    });

    test('should reject short quote', () => {
      mockRequest.body = {
        lang: 'en',
        quote: 'Short',
        author: 'Test Author'
      };

      validateQuote(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    test('should reject invalid language format', () => {
      mockRequest.body = {
        lang: 'invalid123',
        quote: 'This is a valid quote for testing purposes',
        author: 'Test Author'
      };

      validateQuote(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    test('should trim whitespace from fields', () => {
      mockRequest.body = {
        lang: 'en',
        quote: '  This is a valid quote for testing purposes  ',
        author: '  Test Author  '
      };

      validateQuote(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.body.quote).toBe('This is a valid quote for testing purposes');
      expect(mockRequest.body.author).toBe('Test Author');
    });

    test('should strip unknown fields', () => {
      mockRequest.body = {
        lang: 'en',
        quote: 'This is a valid quote for testing purposes',
        author: 'Test Author',
        unknownField: 'should be removed'
      };

      validateQuote(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.body).not.toHaveProperty('unknownField');
    });
  });

  describe('validatePagination', () => {
    test('should validate valid page number', () => {
      mockRequest.query = { page: '5' };

      validatePagination(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.query.page).toBe(5);
    });

    test('should default to page 1 if not provided', () => {
      mockRequest.query = {};

      validatePagination(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.query.page).toBe(1);
    });

    test('should reject page 0', () => {
      mockRequest.query = { page: '0' };

      validatePagination(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      const error = mockNext.mock.calls[0][0];
      expect(error.statusCode).toBe(400);
    });

    test('should reject page > 1000', () => {
      mockRequest.query = { page: '1001' };

      validatePagination(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    test('should handle non-numeric page values', () => {
      mockRequest.query = { page: 'invalid' };

      validatePagination(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(mockRequest.query.page).toBe(1);
    });
  });
});