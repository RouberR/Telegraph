import { Message, Participant, formatMessage } from "../stringsValidation";

describe('formatMessage function', () => {
    const sampleParticipants: Participant[] = [
      { id: '1', userName: 'user1', avatarUrl: 'avatar1.jpg' },
      { id: '2', userName: 'user2', avatarUrl: 'avatar2.jpg' },
    ];
  
    const sampleMessage: Message = {
      id: '123',
      content: 'Hello, World!',
      createdAt: '2022-01-01T12:00:00',
      senderId: '1',
    };
  
    it('should format a message with all details', () => {
      const result = formatMessage(sampleMessage, sampleParticipants);
  
      expect(result._id).toBe('123');
      expect(result.text).toBe('Hello, World!');
      expect(result.createdAt).toEqual(new Date('2022-01-01T12:00:00'));
      expect(result.user._id).toBe('1');
      expect(result.user.name).toBe('user1');
      expect(result.user.avatar).toBe('avatar1.jpg');
    });
  
    it('should handle missing participant details', () => {
      const result = formatMessage({ ...sampleMessage, senderId: '3' }, sampleParticipants);
  
      expect(result.user._id).toBe('3');
      expect(result.user.name).toBe('');
      expect(result.user.avatar).toBe('');
    });
  
    it('should handle missing message details', () => {
      const result = formatMessage({ id: '456', senderId: '2', content: 'Hi!', createdAt: '2022-01-02T15:30:00' }, sampleParticipants);
  
      expect(result._id).toBe('456');
      expect(result.text).toBe('Hi!');
      expect(result.createdAt).toEqual(new Date('2022-01-02T15:30:00'));
      expect(result.user._id).toBe('2');
      expect(result.user.name).toBe('user2');
      expect(result.user.avatar).toBe('avatar2.jpg');
    });
  });