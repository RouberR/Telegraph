import { composeUserDisplayName } from "../stringsValidation";

describe('composeUserDisplayName function', () => {
  it('should compose user display name with all details', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const userName = 'john_doe';

    const result = composeUserDisplayName(firstName, lastName, userName);

    expect(result).toBe('John Doe (john_doe)');
  });

  it('should handle missing first name', () => {
    const lastName = 'Doe';
    const userName = 'john_doe';

    const result = composeUserDisplayName(undefined, lastName, userName);

    expect(result).toBe('Doe (john_doe)');
  });

  it('should handle missing last name', () => {
    const firstName = 'John';
    const userName = 'john_doe';

    const result = composeUserDisplayName(firstName, undefined, userName);

    expect(result).toBe('John (john_doe)');
  });

  it('should handle missing user name', () => {
    const firstName = 'John';
    const lastName = 'Doe';

    const result = composeUserDisplayName(firstName, lastName, undefined);

    expect(result).toBe('John Doe');
  });

  it('should handle missing details', () => {
    const result = composeUserDisplayName(undefined, undefined, undefined);

    expect(result).toBe('');
  });
});
