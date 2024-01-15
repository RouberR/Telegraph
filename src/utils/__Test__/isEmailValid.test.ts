
import { isEmailValid } from '../stringsValidation'; 

describe('isEmailValid function', () => {
    it('should return true for a valid email', () => {
      const validEmail = 'test@example.com';
      expect(isEmailValid(validEmail)).toBe(true);
    });
  
    it('should return false for an invalid email', () => {
      const invalidEmail = 'invalid-email';
      expect(isEmailValid(invalidEmail)).toBe(false);
    });
  
    it('should return false for an empty email', () => {
      const emptyEmail = '';
      expect(isEmailValid(emptyEmail)).toBe(false);
    });
  
    it('should return false for null or undefined input', () => {
      expect(isEmailValid(null)).toBe(false);
      expect(isEmailValid(undefined)).toBe(false);
    });
  
    it('should return true for a valid email with different domain', () => {
      const validEmail = 'user@mail.com';
      expect(isEmailValid(validEmail)).toBe(true);
    });
  
    it('should return true for a valid email with mixed case', () => {
      const validEmail = 'Test@Example.com';
      expect(isEmailValid(validEmail)).toBe(true);
    });
  
    it('should return false for an invalid email with special characters', () => {
      const invalidEmail = 'user@!example.com';
      expect(isEmailValid(invalidEmail)).toBe(false);
    });
  });
  
